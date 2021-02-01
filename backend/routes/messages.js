const express = require("express");
const router = express.Router();

let Message = require("../model/message.js");

/**
 * Add a message if all required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("from", "Message: from must be set").notEmpty();
  req.assert("message", "Message: message must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let message = new Message(req.body);
    message.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "message created", message });
      }
    });
  }
});

/**
 * Edit the information of a specific message (given the message id)
 */
router.post("/edit/:id", function (req, res) {
  let message = req.body;
  let query = { _id: req.params.id };

  Message.updateOne(query, message, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res
        .status(200)
        .json({ msg: "message successfully updated", message: message });
    }
  });
});

/**
 * Get all messages
 */
router.get("/", function (req, res) {
  Message.find({}, function (err, messages) {
    if (err) {
      console.log(err);
    } else {
      res.json({ messages: messages });
    }
  });
});

/**
 * Get the information of a specific message (given the message id)
 */
router.get("/:id", function (req, res) {
  let id = req.params.id;
  Message.findById(id, function (err, message) {
    if (err) {
      console.log(err);
    } else {
      res.json(message);
    }
  });
});

/**
 * Delete the information of a specific file (given the message id)
 */
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Message.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "message deleted successfully!" });
  });
});
module.exports = router;
