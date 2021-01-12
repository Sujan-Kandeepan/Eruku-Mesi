const express = require("express");
const router = express.Router();

let Photo = require("../model/photo.js");

router.post("/add", function (req, res) {
  req.assert("name", "Post username must be set").notEmpty();
  req.assert("url", "Post lastname must be set").notEmpty();

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
router.get("/", function (req, res) {
  Photo.find({}, function (err, photos) {
    if (err) {
      console.log(err);
    } else {
      res.json({ photos: photos });
    }
  });
});

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
