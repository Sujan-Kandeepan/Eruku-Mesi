const express = require("express");
const router = express.Router();

let Event = require("../model/event.js");

/**
 * Add the information of a specific event if the required field is not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("title", "Event: title must be set").notEmpty();
  req.assert("date", "Event: date must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }
  try {
    const event = new Event(req.body);
    await event.save();
    return res
      .status(200)
      .json({ message: "event successfully added", event: event });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit the information of a specific event (given the event id)
 */
router.post("/edit/:id", async function (req, res) {
  let eventBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(eventBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const event = await Event.updateOne(query, eventBody);
    return res
      .status(200)
      .json({ msg: "event successfully updated", event: event });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information on all events
 */
router.get("/", async function (req, res) {
  try {
    const events = await Event.find({});
    return res.status(200).json(events);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a event (given the event id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const event = await Event.findById(id);
    return res.status(200).json({ event: event });
  } catch (e) {
    return res.status(500).json({ message: "event not found" });
  }
});

/**
 * Delete the information of a specific event (given the event id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Event.remove(query);
    res.status(200).json({ message: "event deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "event was not deleted" });
  }
});

module.exports = router;
