const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationDB = mongoose.connection.useDb("Notifications");

let Notification = new Schema({
  receiver: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = notificationDB.model(
  "Notification",
  Notification,
  "Notification"
);
