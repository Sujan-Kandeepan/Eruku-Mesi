const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mediaContentsDB = mongoose.connection.useDb("MediaContents");

let Photo = new Schema({
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
  image: {
    type: String,
    required: true,
  },
});
module.exports = mediaContentsDB.model("Photo", Photo, "Photo");
