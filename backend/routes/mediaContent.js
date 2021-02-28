const express = require("express");
const router = express.Router();

let MediaContent = require("../model/mediaContent.js");

/**
 * Upload mediaContent if all required fields are not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("title", "MediaContent: title must be set").notEmpty();
  req.assert("url", "MediaContent: url must be set").notEmpty();
  req.assert("type", "MediaContent: type must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
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
