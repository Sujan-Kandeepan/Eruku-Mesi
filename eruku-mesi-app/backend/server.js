const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const expressRoutes = express.Router();
const PORT = 4000;

let Account = require('./account.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/accounts', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

expressRoutes.route('/').get(function(req, res) {
    Account.find(function(err, accounts) {
        if (err) {
            console.log(err);
        } else {
            res.json(accounts);
        }
    });
});

expressRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Account.findById(id, function(err, account) {
        res.json(account);
    });
});

expressRoutes.route('/update/:id').post(function(req, res) {
    Account.findById(req.params.id, function(err, account) {
        if (!account)
            res.status(404).send("data is not found");
        else
            account.account_description = req.body.account_description;
            account.account_username = req.body.account_username;
            account.account_email = req.body.account_email;
            account.account_firstname = req.body.account_firstname;
            account.account_lastname = req.body.account_lastname;
            account.account_password = req.body.account_password;
            account.account_location = req.body.account_location;
            account.save().then(account => {
                res.json('Account updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

expressRoutes.route('/add').post(function(req, res) {
    let account = new Account(req.body);
    account.save()
        .then(account => {
            res.status(200).json({'account': 'account added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new account failed');
        });
});

app.use('/accounts', expressRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});