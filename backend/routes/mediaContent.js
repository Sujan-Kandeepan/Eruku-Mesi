const express = require("express");
const router = express.Router();

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require("../config/aws.js");

let MediaContent = require("../model/mediaContent.js");
 
const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});

const fileFilter = (_, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true)
  } else {
      cb(new Error('Invalid file type'));
  }
}

const fileLimitSizeInMegaBytes = 5;
//template from: https://github.com/badunk/multer-s3
const upload = multer({
  fileFilter,
  limits: { fileSize: fileLimitSizeInMegaBytes * 1024 * 1024 },
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'erukumesi',
    key: (_, file, cb) => {
      const typeInString = file.mimetype.split('/')[1];
      cb(null, Date.now().toString() + "." + typeInString);
    }
  })
})

const multerUpload = upload.single('uploadFile');

/**
 * Upload mediaContent if all required fields are not empty.
 * Additional reference: https://stackoverflow.com/questions/39265838/express-js-image-upload-and-text-inputs-using-post-method
 * Must have one body property with key of 'photo'.
 */
router.post("/add", async function (req, res) {
  multerUpload(req, res, async function(multerError) {

    if (multerError) {
      return res.status(500).json({
        status: "error",
        message: multerError.message,
      });
    }

    req.assert("title", "MediaContent: title must be set").notEmpty();
    req.assert("type", "MediaContent: type must be set").notEmpty();
    req.assert("description", "MediaContent: description must be set").notEmpty();
    
    let validationErrors = req.validationErrors();

    if (validationErrors) {
      return res.status(400).json({
        status: "error",
        message: "Mandatory field is not set",
      });
    }

    try {
      req.body.url = req.file.location
      const mediaContent = new MediaContent(req.body);
      await mediaContent.save();
      return res
        .status(200)
        .json({ message: "mediaContent successfully added", mediaContent: mediaContent });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }

  });
});

/**
 * Edit the information of a specific mediaContent (given the mediaContent id)
 */
router.post("/edit/:id", async function (req, res) {
  let mediaContentBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(mediaContentBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const mediaContent = await MediaContent.updateOne(query, mediaContentBody);
    return res
      .status(200)
      .json({ msg: "mediaContent successfully updated", mediaContent: mediaContent });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get all mediaContent sorted in descending order
 */
router.get("/", async function (req, res) {
  try {

    const mediaContent = await MediaContent.find({}).sort({uploadedAt: -1});

    return res.status(200).json(mediaContent);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific mediaContent (given the mediaContent id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const mediaContent = await MediaContent.findById(id);
    return res.status(200).json({ mediaContent: mediaContent });
  } catch (e) {
    return res.status(500).json({ message: "mediaContent not found" });
  }
});


/**
 * Delete the information of a specific mediaContent (given the mediaContent id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await MediaContent.deleteOne(query);
    res.status(200).json({ message: "mediaContent deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "mediaContent was not deleted" });
  }
});
module.exports = router;
