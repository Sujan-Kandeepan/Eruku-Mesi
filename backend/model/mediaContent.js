const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mediaContentDB = mongoose.connection.useDb("MediaContent");

let MediaContent = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["photo", "file"],
    required: true,
  }
});
module.exports = mediaContentDB.model("MediaContent", MediaContent, "MediaContent");
