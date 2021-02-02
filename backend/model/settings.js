const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settingsDB = mongoose.connection.useDb("Settings");

let Setting = new Schema({
  notificationOptIn: {
    type: Boolean,
    default: false,
  },
  preferredTheme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
});
module.exports = settingsDB.model("Settings", Setting, "Settings");
