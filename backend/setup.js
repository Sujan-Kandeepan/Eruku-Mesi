const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config(); // load environment from .env file automatically
const config = require("./config/database.js");
const mongoose = require("mongoose");
const PORT = config.PORT || 4000;
app.PORT = PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

// Check for mongodb connection error
connection.on("error", function (err) {
  console.log(err);
});

// format error message
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

const accounts = require("./routes/accounts");
const events = require("./routes/events");
const feedback = require("./routes/feedback");
const information = require("./routes/information");
const messages = require("./routes/messages");
const newsStories = require("./routes/newsStories");
const notifications = require("./routes/notifications");
const mediaContent = require("./routes/mediaContent");

/**
 * Creating the routes through the router.
 * Reference: https://expressjs.com/en/guide/routing.html (express.Router component)
 */
app.use("/accounts", accounts);
app.use("/events", events);
app.use("/feedback", feedback);
app.use("/information", information);
app.use("/messages", messages);
app.use("/newsStories", newsStories);
app.use("/notifications", notifications);
app.use("/mediaContent", mediaContent)

// app.listen(PORT, function () {
//   console.log("Server is running on port: " + PORT);
// });

module.exports = app;