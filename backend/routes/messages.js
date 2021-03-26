const express = require("express");
const router = express.Router();

let Message = require("../model/message.js");

/**
 * Add a message if all required fields are not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("sender", "Message: sender must be set").notEmpty();
  req.assert("message", "Message: message must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      msg: "Mandatory field is not set",
    });
  }

  try {
    const message = new Message(req.body);
    await message.save();
    return res
      .status(200)
      .json({ msg: "message successfully added" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
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
      msg: "No field to update with",
    });
  }

  try {
    const message = await Message.updateOne(query, messageBody);
    return res
      .status(200)
      .json({ msg: "message successfully updated" });
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
 * Type is an integer. Type is either 1, 2, or 3.
 * If it is 1, then it returns 15 documents before that objectID
 * If it is 2, then it returns the last 15 documents. You can pass in anything into the ID field.
 * If it is 3, then it returns all the documents after that objectID
 */
router.get("/:type/:id", async function(req, res) {
  let id = req.params.id;
  let type = Number.parseInt(req.params.type, 10);
  const number = 15;

  if (type == 1) {
    try {
      const messages = await Message.find({ '_id': { $lt: id } }).sort({ _id: -1 }).limit(number);
      messages.reverse()
      return res.status(200).json({ messages: messages });
    } catch (e) {
      return res.status(500).json(e);
    }
  } else if (type == 2) {
    //https://stackoverflow.com/questions/10811887/how-to-get-all-count-of-mongoose-model
    const messageCount = await Message.countDocuments({}).exec();
    try {
      let messages;
      if (messageCount > number) {
        messages = await Message.find({}).skip(messageCount - number);
      } else {
        messages = await Message.find({})
      }
      // const messages = await Message.find({}).skip(messageCount - number);
      return res.status(200).json({ messages: messages });
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    try {
      const messages = await Message.find({ '_id': { $gt: id } });
      return res.status(200).json({ messages: messages });
    } catch (e) {
      return res.status(500).json(e);
    }
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
    return res.status(500).json({ msg: "message not found" });
  }
});

/**
 * Delete the information of a specific message (given the message id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Message.deleteOne(query);
    res.status(200).json({ msg: "message deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ msg: "message was not deleted" });
  }
});
module.exports = router;
