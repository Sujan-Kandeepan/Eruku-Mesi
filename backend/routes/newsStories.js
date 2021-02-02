const express = require("express");
const router = express.Router();

let NewsStory = require("../model/newsStory.js");

/**
 * Add a single newsStory if all required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("title", "NewsStory: title must be set").notEmpty();
  req.assert("content", "NewsStory: content must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
    const newsStories = new NewsStory(req.body);
    newsStories.save();
    return res
      .status(200)
      .json({
        message: "newsStories successfully added",
        newsStories: newsStories,
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit a single newsStory (given the newsStory id)
 */
router.post("/edit/:id", async function (req, res) {
  let newsStoryBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(newsStoryBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const newsStory = await NewsStory.updateOne(query, newsStoryBody);
    return res
      .status(200)
      .json({ message: "newsStory successfully updated", newsStory: newsStory });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get all newsStories
 */
router.get("/", async function (req, res) {
  try {
    const newsStories = await NewsStory.find({});
    return res.status(200).json(newsStories);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific newsStory (given the newsStory id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const newsStory = await NewsStory.findById(id);
    return res.status(200).json({ newsStory: newsStory });
  } catch (e) {
    return res.status(500).json({ message: "newsStory not found" });
  }
});

/**
 * Delete a newsStory (given the newsStory id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await NewsStory.remove(query);
    res.status(200).json({ message: "newsStory deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "newsStory was not deleted" });
  }
});

module.exports = router;
