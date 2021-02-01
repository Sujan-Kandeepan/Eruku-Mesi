const express = require("express");
const router = express.Router();

let Event = require("../model/event.js");

/**
 * Add the information of a specific event if the required field is not empty.
 */
router.post("/add", function (req, res) {
  req.assert("name", "Event: name must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let event = new Event(req.body);
    event.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "event created", event });
      }
    });
  }
});

/**
 * Edit the information of a specific event (given the event id)
 */
router.post("/edit/:id", function (req, res) {
  let event = req.body;
  let query = { _id: req.params.id };

  Event.updateOne(query, event, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(200).json({ msg: "event successfully updated", event: event });
    }
  });
});

/**
 * Get the information on all events
 */
router.get("/", function (req, res) {
  Event.find({}, function (err, events) {
    if (err) {
      console.log(err);
    } else {
      res.json({ events: events });
    }
  });
});

/**
 * Get the information of a event (given the event id)
 */
router.get("/:id", function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event) {
    if (err) {
      console.log(err);
    } else {
      res.json(event);
    }
  });
});

/**
 * Delete the information of a specific event (given the event id)
 */
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Event.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "event deleted successfully!" });
  });
});

module.exports = router;
