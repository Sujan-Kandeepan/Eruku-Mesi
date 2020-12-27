const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Account = new Schema({
    account_id: {
        type: String
    },
    account_username: {
        type: String
    },
    account_email: {
        type: String
    },
    account_firstname: {
        type: String
    },
    account_lastname: {
        type: String
    },
    account_password: {
        type: String
    },
    account_location: {
        type: String
    }
});
module.exports = mongoose.model('Account', Account);