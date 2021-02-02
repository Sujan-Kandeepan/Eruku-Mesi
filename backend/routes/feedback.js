const express = require("express");
const router = express.Router();

let Feedback = require("../model/feedback.js");

/**
 * Add the information of a specific feedback if the required field is not empty.
 */
router.post("/add", function (req, res) {
  req.assert("text", "Feedback: text must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }
  try {
    const feedback = new Feedback(req.body);
    feedback.save();
    return res
      .status(200)
      .json({ message: "feedback successfully added", feedback: feedback });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit the information of a specific feedback (given the feedback id)
 */
router.post("/edit/:id", async function (req, res) {
  let eventBody = req.body;
  let query = { _id: req.params.id };

  if (Feedback.keys(eventBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const feedback = await Feedback.updateOne(query, eventBody);
    return res
      .status(200)
      .json({ msg: "feedback successfully updated", feedback: feedback });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information on all feedback
 */
router.get("/", async function (req, res) {
  try {
    const feedback = await Feedback.find({});
    return res.status(200).json(feedback);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a feedback (given the feedback id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const feedback = await Feedback.findById(id);
    return res.status(200).json({ feedback: feedback });
  } catch (e) {
    return res.status(500).json({ message: "feedback not found" });
  }
});

/**
 * Delete the information of a specific feedback (given the feedback id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Feedback.remove(query);
    res.status(200).json({ message: "feedback deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "feedback was not deleted" });
  }
});

module.exports = router;
