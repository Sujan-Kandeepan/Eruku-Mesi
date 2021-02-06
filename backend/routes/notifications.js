const express = require("express");
const router = express.Router();

let Notification = require("../model/notification.js");

/**
 * Add a notification if all required fields are not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("receiver", "Notification: receiver must be set").notEmpty();
  req.assert("body", "Notification: body must have content").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
    const notification = new Notification(req.body);
    await notification.save();
    return res
      .status(200)
      .json({
        message: "notification successfully added",
        notification: notification,
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit a notification (given the notification id)
 */
router.post("/edit/:id", async function (req, res) {
  let notificationBody = req.body;
  let query = { _id: req.params.id };

  if (notificationBody.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const notification = await Notification.updateOne(query, notificationBody);
    return res
      .status(200)
      .json({ message: "notification successfully updated", notification: notification });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get all notifications
 */
router.get("/", async function (req, res) {
  try {
    const notifications = await Notification.find({});
    return res.status(200).json(notifications);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific notification (given the notification id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const notification = await Notification.findById(id);
    return res.status(200).json({ notification: notification });
  } catch (e) {
    return res.status(500).json({ message: "notification not found" });
  }
});

/**
 * Delete a notification (given the notification id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Notification.remove(query);
    res.status(200).json({ message: "notification deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "notification was not deleted" });
  }
});

module.exports = router;
