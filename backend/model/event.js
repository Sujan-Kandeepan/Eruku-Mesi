const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventDB = mongoose.connection.useDb("Events");

let Event = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
  },
  media: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "MediaContent",
  },
});
module.exports = eventDB.model("Event", Event, "Event");
