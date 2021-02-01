const express = require("express");
const router = express.Router();

let Account = require("../model/account.js");

/**
 * Add a user if the required fields are not empty.
 */
router.post("/add", function (req, res) {
  req.assert("username", "Account: username must be set").notEmpty();
  req.assert("firstName", "Account: firstName must have content").notEmpty();
  req.assert("lastName", "Account: lastname must be set").notEmpty();
  req.assert("phone", "Account: phone must have content").notEmpty();
  req.assert("hash", "Account: hash must be set").notEmpty();
  req.assert("salt", "Account: salt must have content").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  } else {
    let account = new Account(req.body);
    account.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "account created", account });
      }
    });
  }
});

/**
 * Get all users
 */
router.get("/", function (req, res) {
  Account.find({}, function (err, accounts) {
    if (err) {
      console.log(err);
    } else {
      res.json({ accounts: accounts });
    }
  });
});

/**
 * Edit the information of a specific user (given the user id)
 */
router.post("/edit/:id", function (req, res) {
  let account = req.body;
  let query = { _id: req.params.id };

  Account.updateOne(query, account, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res
        .status(200)
        .json({ msg: "account successfully updated", account: account });
    }
  });
});

/**
 * Get the information of a specific user (given the user id)
 */
router.get("/:id", function (req, res) {
  let id = req.params.id;
  Account.findById(id, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      res.json(account);
    }
  });
});

/**
 * Delete the information of a specific user (given the user id)
 */
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Account.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "account deleted successfully!" });
  });
});

module.exports = router;
