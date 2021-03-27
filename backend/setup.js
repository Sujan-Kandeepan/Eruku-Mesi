const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
let { Expo } = require("expo-server-sdk");
let expo = new Expo();
const cron = require("node-cron");
const moment = require("moment");
const expressValidator = require("express-validator");
require("dotenv").config(); // load environment from .env file automatically
const config = require("./config/database.js");
const mongoose = require("mongoose");
const PORT = config.PORT || 4000;
let Event = require("./model/event.js");
let Account = require("./model/account.js");
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
app.use("/mediaContent", mediaContent);

/**
 * 
 * Send a pushNotification by constructing a message using the title and body
 */
async function sendNotification(title, body) {
  try {
    let push_tokens = await getPushTokens();

    let messages = createMessages(
      title,
      body,
      {
        body,
      },
      push_tokens
    );
    let tickets = await sendMessages(messages);
    let receiptIds = getReceiptIds(tickets);
    await obtainReceipts(receiptIds);
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 
 * Fetch expo tokens in the database
 */
async function getPushTokens() {
  try {
    const expoTokens = await Account.find(
      { expoToken: { $ne: null }}, {expoToken: 1})
    var tokens = [];
    expoTokens.forEach((device) => tokens.push(device.expoToken));

    return tokens;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 
 * Create messages with expo pushTokens
 */
function createMessages(title, body, data, pushTokens) {
  let messages = [];
  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: "default",
      title: title,
      body,
      data,
    });
  }
  return messages;
}

/**
 * 
 * Send messages with expo pushTokens
 */
async function sendMessages(messages) {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
  return tickets;
}

/**
 * 
 * Get receipt Ids for messages
 */
function getReceiptIds(tickets) {
  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  return receiptIds;
}

/**
 * 
 * obtain receipt for messages
 */
async function obtainReceipts(receiptIds) {
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

      if (!Array.isArray(receipts)) {
        let receipt = receipts;
        if (receipt.status === "ok") {
          continue;
        } else if (receipt.status === "error") {
          console.error(
            `There was an error sending a notification: ${receipt.message}`
          );
          if (receipt.details && receipt.details.error) {
            console.error(`The error code is ${receipt.details.error}`);
          }
        }
        return;
      }

      for (let receipt of receipts) {
        if (receipt.status === "ok") {
          continue;
        } else if (receipt.status === "error") {
          console.error(
            `There was an error sending a notification: ${receipt.message}`
          );
          if (receipt.details && receipt.details.error) {
            console.error(`The error code is ${receipt.details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
// source code: https://medium.com/@steve.mu.dev/implementing-push-notification-with-react-native-and-node-js-fdb06c2cbca8

cron.schedule("0 8 * * *", async function () {
  // cron job schedule every day 8AM 
  var start = ((moment(Date.now()).utcOffset('-0500').format('x')));
  start = new Date(parseInt(start));
  start = moment(start);
  var end = moment(start).add(1, "days");

  try {
    const events = await Event.find({
      date: { $gte: start, $lt: end },
    });
    if (!events.length) {
      ("No event is scheduled in 24 hours");
    } else {
      events.forEach(async (event) => {
      var titleMessage = `${event.title} is happening in 24 hours`;
      var bodyMessage = `${event.description}`;

      await sendNotification(titleMessage, bodyMessage);
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = app;
