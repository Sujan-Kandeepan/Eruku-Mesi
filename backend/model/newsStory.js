const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewsStoriesDB = mongoose.connection.useDb("NewsStories");

let NewsStory = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
  },
  topic: {
    type: String,
    enum: [
      "featured",
      "business",
      "editorial",
      "special",
      "guest",
      "newsmaker interviews",
      "international",
      "multimedia",
      "sport",
    ],
    default: "featured",
  },
  media: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "MediaContent",
  },
});
module.exports = NewsStoriesDB.model("NewsStory", NewsStory, "NewsStory");
