require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
// const config = require('./config/database.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// Check for mongodb connection error
connection.on('error', function(err) {
    console.log(err)
})

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


const accounts = require('./routes/accounts');
const events = require('./routes/events');
const files = require('./routes/files');
const messages = require('./routes/messages');
const newsStories = require('./routes/newsStories');
const notifications = require('./routes/notifications');
const photos = require('./routes/photos');

app.use('/accounts', accounts);
app.use('/events', events);
app.use('/files', files);
app.use('/messages', messages);
app.use('/newsStories', newsStories);
app.use('/notifications', notifications);
app.use('/photos', photos);


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});


// expressRoutes.route('/').get(function(req, res) {
//     Account.find(function(err, accounts) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(accounts);
//         }
//     });
// });

// expressRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     Account.findById(id, function(err, account) {
//         res.json(account);
//     });
// });

// expressRoutes.route('/update/:id').post(function(req, res) {
//     Account.findById(req.params.id, function(err, account) {
//         if (!account) {
//             res.status(404).send("Data is not found");
//         } else {
//             // if it works, we can use account = { ...account, ...req.body }
//             account.account_id = req.body.account_id;
//             account.account_username = req.body.account_username;
//             account.account_email = req.body.account_email;
//             account.account_firstname = req.body.account_firstname;
//             account.account_lastname = req.body.account_lastname;
//             account.account_password = req.body.account_password;
//             account.account_location = req.body.account_location;
//             account.save().then(account => {
//                 res.json('Account updated');
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//         }
//     });
// });

// expressRoutes.route('/add').post(function(req, res) {
//     let account = new Account(req.body);
//     account.save()
//         .then(account => {
//             res.status(200).json({'account': 'Account added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Adding new account failed');
//         });
// });