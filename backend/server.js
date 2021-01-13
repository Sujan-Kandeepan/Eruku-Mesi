/**
 * Server.js is the starting point file that gets executed when you start running the backend code.
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config(); // load environment from .env file automatically
const config = require('./config/database.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000; 

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(config.database, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// Check for mongodb connection error
connection.on('error', function(err) {
    console.log(err)
})

// format error message
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

/**
 * Creating the routes through the router.
 * Reference: https://expressjs.com/en/guide/routing.html (express.Router component)
 */
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


