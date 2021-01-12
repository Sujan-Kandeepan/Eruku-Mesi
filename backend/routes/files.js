const express = require("express");
const router = express.Router();

let File = require("../model/file.js");

router.post("/add", function (req, res) {
  req.assert("name", "Post name must be set").notEmpty();
  req.assert("url", "Post url must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let file = new File(req.body);
    file.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "file created", file });
      }
    });
  }
});

router.post("/edit/:id", function (req, res) {
  let file = req.body;
  let query = { _id: req.params.id };

  File.update(query, file, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(200).json({ msg: "file successfully updated", file: file });
    }
  });
});

router.get("/", function (req, res) {
  File.find({}, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      res.json({ files: files });
    }
  });
});

router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  File.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "file deleted successfully!" });
  });
});

module.exports = router;