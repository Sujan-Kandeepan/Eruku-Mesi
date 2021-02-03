const express = require("express");
const router = express.Router();

let File = require("../model/file.js");

/**
 * Upload a file if all required fields are not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("title", "File: title must be set").notEmpty();
  req.assert("url", "File: url must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
    const file = new File(req.body);
    await file.save();
    return res
      .status(200)
      .json({ message: "file successfully added", file: file });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit the information of a specific file (given the file id)
 */
router.post("/edit/:id", async function (req, res) {
  let fileBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(fileBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const file = await File.updateOne(query, fileBody);
    return res
      .status(200)
      .json({ msg: "file successfully updated", file: file });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of all the files
 */
router.get("/", async function (req, res) {
  try {
    const files = await File.find({});
    return res.status(200).json(files);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific file (given the file id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const file = await File.findById(id);
    return res.status(200).json({ file: file });
  } catch (e) {
    return res.status(500).json({ message: "file not found" });
  }
});

/**
 * Delete the information of a specific file (given the file id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await File.remove(query);
    res.status(200).json({ message: "file deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "file was not deleted" });
  }
});

module.exports = router;
