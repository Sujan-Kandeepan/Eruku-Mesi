const express = require("express");
const router = express.Router();

let Account = require("../model/account.js");

router.post("/add", function (req, res) {
  req.assert("username", "Post username must be set").notEmpty();
  req.assert("firstName", "Post firstName must have content").notEmpty();
  req.assert("lastName", "Post lastname must be set").notEmpty();
  req.assert("phone", "Post phone must have content").notEmpty();
  req.assert("hash", "Post hash must be set").notEmpty();
  req.assert("salt", "Post salt must have content").notEmpty();

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

router.get("/", function (req, res) {
  Account.find({}, function (err, accounts) {
    if (err) {
      console.log(err);
    } else {
      res.json({ accounts: accounts });
    }
  });
});

router.post("/edit/:id", function (req, res) {
  let account = req.body;
  let query = { _id: req.params.id };

  Account.update(query, account, function (err) {
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

// currently not working
// router.get("/:id").get(function (req, res) {
//   let id = req.params.id;
//   console.log(id)
  
//   Account.findById(id, function (err, account) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(account);
//     }
//   });
// });

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
