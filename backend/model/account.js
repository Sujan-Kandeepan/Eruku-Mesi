const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountDB = mongoose.connection.useDb("Accounts");
var crypto = require('crypto');

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
  email: {
    type: String,
    required: true,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
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
    type: String,
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
  receiveNotifications: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  expoToken: {
    type: String,
    default: null
  }
});


// Method to set salt and hash the password for a user
Account.methods.setPassword = function(password) {

 // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations

    this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not
Account.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = accountDB.model("Account", Account, "User");