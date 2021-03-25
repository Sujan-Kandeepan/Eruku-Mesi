const express = require("express");
const router = express.Router();

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require("../config/aws.js");

let Information = require("../model/information.js");

const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});

const fileFilter = (_, file, cb) => {
  if (file.mimetype === 'image/png' 
      || file.mimetype === 'image/jpeg' 
      || file.mimetype === 'image/gif') {
      cb(null, true)
  } else {
      cb(new Error('Invalid file type'));
  }
}

const fileLimitSizeInMegaBytes = 15;
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
 * Add information if the required field is not empty.
 */
 router.post("/add", async function (req, res) {
  
  multerUpload(req, res, async function(multerError) {

    if (multerError) {
      return res.status(500).json({
        status: "error",
        message: multerError.message,
      });
    }

  req.assert("title", "Information: title must be set").notEmpty();
  req.assert("content", "Information: content must be set").notEmpty();

    let validationErrors = req.validationErrors();

    if (validationErrors) {
      return res.status(400).json({
        status: "error",
        message: "Mandatory field is not set",
      });
    }

    try {
      req.body.imageTop = req.file ? req.file.location : null
      const information = new Information(req.body);
      await information.save();
      return res
        .status(200)
        .json({ message: "Information successfully added"});
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }

  });
});

/**
 * Edit information of a specific information (given the information id)
 */
router.post("/edit/:id", async function (req, res) {

  multerUpload(req, res, async function(multerError) {
    let query = { _id: req.params.id };
    if (multerError) {
      return res.status(500).json({
        status: "error",
        message: multerError.message,
      });
    }

    if (req.file) {
      
      if (multerError) {
        return res.status(500).json({
          status: "error",
          message: multerError.message,
        });
      }

      try {
        req.body.imageTop = req.file.location
        const information = await Information.updateOne(query, req.body);
        return res
          .status(200)
          .json({ message: "Information successfully updated" });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    } else {
      try {
        if ((!req.body.uploadFile && req.body.uploadFile !== undefined)
          || ['null', 'undefined'].includes(req.body.uploadFile)) {
          req.body.imageTop = null;
          req.body.metadataImageTop = null;
        }
        const information = await Information.updateOne(query, req.body);
        return res
          .status(200)
          .json({ message: "Information successfully updated" });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    }
  });

});

/**
 * Get all information
 */
router.get("/", async function (req, res) {
  try {
    const information = await Information.find({});
    return res.status(200).json(information);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get information (given the information id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const information = await Information.findById(id);
    return res.status(200).json({ information: information });
  } catch (e) {
    return res.status(500).json({ message: "information not found" });
  }
});

/**
 * Delete the information of a specific information (given the information id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Information.deleteOne(query);
    res.status(200).json({ message: "information deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "information was not deleted" });
  }
});

module.exports = router;
