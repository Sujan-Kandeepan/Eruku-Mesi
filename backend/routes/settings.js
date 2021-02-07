const express = require("express");
const router = express.Router();

let Settings = require("../model/settings.js");

/**
 * Upload a setting if all required fields are not empty.
 */
router.post("/add", async function (req, res) {
  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Error in the fields",
    });
  }

  try {
    const setting = new Settings(req.body);
    await setting.save();
    return res
      .status(200)
      .json({ message: "setting successfully added", setting: setting });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit the information of a specific setting (given the setting id)
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
    const setting = await Settings.updateOne(query, fileBody);
    return res
      .status(200)
      .json({ msg: "setting successfully updated", setting: setting });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of all the settings
 */
router.get("/", async function (req, res) {
  try {
    const settings = await Settings.find({});
    return res.status(200).json(settings);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific setting (given the setting id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const setting = await Settings.findById(id);
    return res.status(200).json({ setting: setting });
  } catch (e) {
    return res.status(500).json({ message: "setting not found" });
  }
});

/**
 * Delete the information of a specific setting (given the setting id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Settings.deleteOne(query);
    res.status(200).json({ message: "setting deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "setting was not deleted" });
  }
});

module.exports = router;
