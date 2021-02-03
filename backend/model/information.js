const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const informationDB = mongoose.connection.useDb("Information");

let Information = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageTop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
  },
  imageBottom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
  },
});
module.exports = informationDB.model("Information", Information, "Information");
