const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Account = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetToken: {
        type: Date,
        default: null
    },
    location: {
        city: {
            type: String
        },
        province: {
            type: String
        },
        country: {
            type: String
        }
    },
    accountType: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Account', Account, 'User');
