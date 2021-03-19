const express = require("express");
const account = require("../model/account.js");
const router = express.Router();

let Account = require("../model/account.js");

/**
 * Add a user if the required fields are not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("username", "Account: username must be set").notEmpty();
  req.assert("firstName", "Account: firstName must have content").notEmpty();
  req.assert("lastName", "Account: lastname must be set").notEmpty();
  req.assert("phone", "Account: phone must have content").notEmpty();
  req.assert("email", "Account: email must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

  try {
    const account = new Account(req.body);
    await account.save();
    return res.status(200).json({ message: "account successfully added" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Get all users
 */
router.get("/", async function (req, res) {
  try {
    const accounts = await Account.find(
      {},
      {
        username: 1,
        firstName: 1,
        lastName: 1,
        phone: 1,
        email: 1,
        phoneVerified: 1,
        passwordResetToken: 1,
        resetTokenExpiredAt: 1,
        location: 1,
        accountType: 1,
        createdAt: 1,
        receiveNotifications: 1,
        theme: 1
      }
    );
    return res.status(200).json(accounts);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Edit the information of a specific user (given the user id)
 */
router.post("/edit/:id", async function (req, res) {
  let accountBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(accountBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    await Account.updateOne(query, accountBody);
    return res.status(200).json({ msg: "account successfully updated" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get the information of a specific user (given the user id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const account = await Account.findById(id).select({
      username: 1,
      firstName: 1,
      lastName: 1,
      phone: 1,
      email: 1,
      phoneVerified: 1,
      passwordResetToken: 1,
      resetTokenExpiredAt: 1,
      location: 1,
      accountType: 1,
      createdAt: 1,
      receiveNotifications: 1,
      theme: 1
    });
    return res.status(200).json({ account: account });
  } catch (e) {
    return res.status(500).json({ message: "account not found" });
  }
});

/**
 * Delete the information of a specific user (given the user id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Account.deleteOne(query);
    res.status(200).json({ message: "account deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "account was not deleted" });
  }
});

// User signup api
router.post('/signup', (req, res, next) => {


// Creating empty user object
    let newUser = new Account();

    // Initialize newUser object with request data
    newUser.firstName = req.body.firstName
    newUser.username = req.body.username
    newUser.phone = req.body.phone
    newUser.email = req.body.email
    newUser.lastName = req.body.lastName


    // Call setPassword function to hash password
    newUser.setPassword(req.body.password);

    // Save newUser object to database
    newUser.save((err, User) => {
        if (err) {
          console.log(err)
            return res.status(400).send({
                message : "Failed to add user."
            });
        }
        else {
            return res.status(200).send({
                message : "User added successfully."
            });
        }
    });
});


// User login api
router.post('/login', (req, res) => {
    if (req.body.username != null)
    {
      var lookup  = {'username': req.body.username}
    }
    else if (req.body.email != null)
    {
      var lookup  = {'email': req.body.email}
    }
    else
    {
      return res.status(400).send({
          message : "No Email or Username Entered"
      });
    }
      // Find user with requested field
    Account.findOne(lookup, function(err, user) {
    if (user === null) {
        return res.status(400).send({
            message : "User not found."
        });
    }
    else {
        if (user.validPassword(req.body.password)) {
          var account = {
                      "username" : user.username,
                      "phoneVerified" : user.phoneVerified,
                      "passwordResetToken" : user.passwordResetToken,
                      "accountType" : user.accountType,
                      "_id" : user._id,
                      "createdAt" : user.createdAt,
                      "firstName" : user.firstName,
                      "username" : user.username,
                      "phone" : user.phone,
                      "email" : user.email,
                      "lastName" : user.lastname
                    }
            return res.status(200).send({
                message : "User Logged In",
                account : account
            })
        }
        else {
            return res.status(400).send({
                message : "Wrong Password"
            });
        }
    }
    });
});

module.exports = router;