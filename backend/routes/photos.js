const express = require("express");
const router = express.Router();

let Photo = require("../model/photo.js");

/**
 * Upload a photo notification if all required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("name", "Photo: username must be set").notEmpty();
  req.assert("url", "Photo: lastname must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let photo = new Photo(req.body);
    photo.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "photo created", photo });
      }
    });
  }
});

/**
 * Edit a photo (given the photo id)
 */
router.post("/edit/:id", function (req, res) {
  let photo = req.body;
  let query = { _id: req.params.id };

  Photo.update(query, photo, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(200).json({ msg: "photo successfully updated", photo: photo });
    }
  });
});

/**
 * Get the information of a specific photo (given the photo id)
 */
router.get("/:id", function (req, res) {
  let id = req.params.id;
  Photo.findById(id, function (err, photo) {
    if (err) {
      console.log(err);
    } else {
      res.json(photo);
    }
  });
});

/**
 * Get all photos
 */
router.get("/", function (req, res) {
  Photo.find({}, function (err, photos) {
    if (err) {
      console.log(err);
    } else {
      res.json({ photos: photos });
    }
  });
});

/**
 * Delete a photo (given the photo id)
 */
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Photo.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "photo deleted successfully!" });
  });
});
module.exports = router;
