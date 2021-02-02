const express = require("express");
const router = express.Router();

let Message = require("../model/message.js");

/**
 * Add a message if all required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("sender", "Message: sender must be set").notEmpty();
  req.assert("message", "Message: message must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
    const message = new Message(req.body);
    message.save();
    return res
      .status(200)
      .json({ message: "message successfully added", message: message });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit the information of a specific message (given the message id)
 */
router.post("/edit/:id", async function (req, res) {
  let messageBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(messageBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const message = await Message.updateOne(query, messageBody);
    return res
      .status(200)
      .json({ msg: "message successfully updated", message: message });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get all messages
 */
router.get("/", async function (req, res) {
  try {
    const messages = await Message.find({});
    return res.status(200).json(messages);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific message (given the message id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const message = await Message.findById(id);
    return res.status(200).json({ message: message });
  } catch (e) {
    return res.status(500).json({ message: "message not found" });
  }
});

/**
 * Delete the information of a specific message (given the message id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Message.remove(query);
    res.status(200).json({ message: "message deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "message was not deleted" });
  }
});
module.exports = router;
