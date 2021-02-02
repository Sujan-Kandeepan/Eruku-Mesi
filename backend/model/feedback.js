const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackDB = mongoose.connection.useDb("Feedback");

let Feedback = new Schema({
  text: {
    type: String,
    required: true,
  }
});
module.exports = feedbackDB.model("Feedback", Feedback, "Feedback");
