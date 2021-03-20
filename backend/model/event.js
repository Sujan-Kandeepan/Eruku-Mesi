const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventDB = mongoose.connection.useDb("Events");

let Event = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
  },
  media: {
    type: [ String ],
    default: [],
  },
});
module.exports = eventDB.model("Event", Event, "Event");
