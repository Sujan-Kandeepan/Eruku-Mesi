const express = require("express");
const router = express.Router();

let Notification = require("../model/notification.js");

/**
 * Add a notification if all required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("receiver", "Notification: receiver must be set").notEmpty();
  req.assert("body", "Notification: body must have content").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let notification = new Notification(req.body);
    notification.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "notification created", notification });
      }
    });
  }
});

/**
 * Edit a notification (given the notification id)
 */
router.post("/edit/:id", function (req, res) {
  let notification = req.body;
  let query = { _id: req.params.id };

  Notification.updateOne(query, notification, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res
        .status(200)
        .json({
          msg: "notification successfully updated",
          notification: notification,
        });
    }
  });
});

/**
 * Get all notifications
 */
router.get("/", function (req, res) {
  Notification.find({}, function (err, notifications) {
    if (err) {
      console.log(err);
    } else {
      res.json({ notifications: notifications });
    }
  });
});

/**
 * Get the information of a specific notification (given the notification id)
 */
router.get("/:id", function (req, res) {
  let id = req.params.id;
  Notification.findById(id, function (err, notification) {
    if (err) {
      console.log(err);
    } else {
      res.json(notification);
    }
  });
});

/**
 * Delete a notification (given the notification id)
 */
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Notification.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "notification deleted successfully!" });
  });
});

module.exports = router;
