const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatsDB = mongoose.connection.useDb("Chats");

let Message = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = chatsDB.model("Message", Message, "Message");
