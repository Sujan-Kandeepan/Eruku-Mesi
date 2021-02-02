const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountDB = mongoose.connection.useDb("Accounts");

let Account = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiredAt: {
    type: Date,
    default: null,
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
  accountType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Settings",
  },
});
module.exports = accountDB.model("Account", Account, "User");
