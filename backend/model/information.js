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
    type: String,
  },
  imageBottom: {
    type: String,
  },
});
module.exports = informationDB.model("Information", Information, "Information");
