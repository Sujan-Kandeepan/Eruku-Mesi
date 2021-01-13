const express = require("express");
const router = express.Router();

let NewsStory = require("../model/newsStory.js");

/**
 * Add a single newsStory if all required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("title", "NewsStory: title must be set").notEmpty();
  req.assert("content", "NewsStory: content must be set").notEmpty();
  req.assert("source", "NewsStory: source must be set").notEmpty();

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

/**
 * Edit a single newsStory (given the newsStory id)
 */
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

/**
 * Get all newsStories
 */
router.get("/", function (req, res) {
  NewsStory.find({}, function (err, newsStories) {
    if (err) {
      console.log(err);
    } else {
      res.json({ newsStories: newsStories });
    }
  });
});

/**
 * Get the information of a specific newsStory (given the newsStory id)
 */
router.get("/:id", function (req, res) {
  let id = req.params.id;
  NewsStory.findById(id, function (err, newsStory) {
    if (err) {
      console.log(err);
    } else {
      res.json(newsStory);
    }
  });
});

/**
 * Delete a newsStory (given the newsStory id)
 */
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
