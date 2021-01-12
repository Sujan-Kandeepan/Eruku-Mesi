const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mediaContentsDB = mongoose.connection.useDb("MediaContents");

let Photo = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
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
});
module.exports = mediaContentsDB.model("Photo", Photo, "Photo");
