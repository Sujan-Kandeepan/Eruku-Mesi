const express = require("express");
const router = express.Router();

let NewsStory = require("../model/newsStory.js");

router.post("/add", function (req, res) {
  req.assert("title", "Post title must be set").notEmpty();
  req.assert("content", "Post content must be set").notEmpty();
  req.assert("source", "Post source must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let newsStory = new NewsStory(req.body);
    newsStory.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "newsStory created", newsStory });
      }
    });
  }
});

router.post("/edit/:id", function (req, res) {
  let newsStory = req.body;
  let query = { _id: req.params.id };

  NewsStory.update(query, newsStory, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res
        .status(200)
        .json({ msg: "newsStory successfully updated", newsStory: newsStory });
    }
  });
});

router.get("/", function (req, res) {
  NewsStory.find({}, function (err, newsStories) {
    if (err) {
      console.log(err);
    } else {
      res.json({ newsStories: newsStories });
    }
  });
});

router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  NewsStory.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "newsStory deleted successfully!" });
  });
});

module.exports = router;
