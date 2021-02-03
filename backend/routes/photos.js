const express = require("express");
const router = express.Router();

let Photo = require("../model/photo.js");

/**
 * Upload a photo if all required fields are not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("name", "Photo: username must be set").notEmpty();
  req.assert("url", "Photo: lastname must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
    const photo = new Photo(req.body);
    await photo.save();
    return res.status(200).json({
      message: "photo successfully added",
      photo: photo,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit a photo (given the photo id)
 */
router.post("/edit/:id", async function (req, res) {
  let photoBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(photoBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const photo = await Photo.updateOne(query, photoBody);
    return res
      .status(200)
      .json({ message: "photo successfully updated", photo: photo });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific photo (given the photo id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const photo = await Photo.findById(id);
    return res.status(200).json({ photo: photo });
  } catch (e) {
    return res.status(500).json({ message: "photo not found" });
  }
});

/**
 * Get all photos
 */
router.get("/", async function (req, res) {
  try {
    const photos = await Photo.find({});
    return res.status(200).json(photos);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Delete a photo (given the photo id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Photo.remove(query);
    res.status(200).json({ message: "photo deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "photo was not deleted" });
  }
});
module.exports = router;
