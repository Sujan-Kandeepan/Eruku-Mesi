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
    return res
      .status(200)
      .json({ message: "account successfully added", account: account });
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
    const accounts = await Account.find({});
    console.log(accounts[0])
    var modifiedAccount;
    var newAccounts = [] ;
    for (i = 0; i < accounts.length; i++){
      modifiedAccount = JSON.parse(JSON.stringify(accounts[i]));
      delete modifiedAccount.hash;
      delete modifiedAccount.salt;
      console.log(modifiedAccount)
      newAccounts.push(modifiedAccount);
    }
    // console.log(accounts.length)
    // console.log(accounts)
    return res.status(200).json(newAccounts);
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
  const account = await Account.findById(req.params.id);

  if (accountBody['password'] == null){
    return res.status(400).send({
        message : "Must enter password to edit account"
      });
  }
  else{
    if (!account.validPassword(req.body.password)){
      return res.status(400).send({
        message : "Invalid Password. Cannot Edit Account"
      });
    }
  }
  
  if (Object.keys(accountBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const account = await Account.updateOne(query, accountBody);
    return res
      .status(200)
      .json({ msg: "account successfully updated", account: account });
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
    const account = await Account.findById(id);
    var user = JSON.parse(JSON.stringify(account));
    delete user.hash;
    delete user.salt;
    return res.status(200).json({ user: user });
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
  req.assert("username", "Account: username must be set").notEmpty();
  req.assert("firstName", "Account: firstName must have content").notEmpty();
  req.assert("lastName", "Account: lastname must be set").notEmpty();
  req.assert("phone", "Account: phone must have content").notEmpty();
  req.assert("email", "Account: email must be set").notEmpty();
  req.assert("password", "Account: password must be set").notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }

// Creating empty user object 
    let newUser = new Account();

    // Initialize newUser object with request data 
    newUser.firstName = req.body.firstName
    newUser.username  = req.body.username
    newUser.phone     = req.body.phone
    newUser.email     = req.body.email
    newUser.lastName  = req.body.lastName
    Account.findOne(
    {
      $or: [
            {'email': newUser.email},
            {'phone' : newUser.phone},
            {'username' : newUser.username}
          ]
    }, function(err, user) {
        if (user != null){
          if (user.email != null && user.email == newUser.email)
            return res.status(400).send({
              message : "Email already taken."
            })
          else if (user.phone != null && user.phone == newUser.phone)
            return res.status(400).send({
                  message : "Phone already taken."
             })
          else if(user.username != null && user.username == newUser.username)
            return res.status(400).send({
                  message : "Username already taken."
             })
        }
        else{
              // Call setPassword function to hash password 
          newUser.setPassword(req.body.password);

          // // Save newUser object to database 
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
        }
       }
    );
});

//Reference used https://www.loginradius.com/blog/async/password-hashing-with-nodejs/?fbclid=IwAR2YYxo6aiI9mkAs9yIUqeqVT4xDf3KGmBeMJHSiFj6CdCQU4sFYLX1XzV4
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

    if (req.body.password == null){
        return res.status(400).send({
          message : "No Password Entered."
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
          var account = JSON.parse(JSON.stringify(user));
          delete account.hash;
          delete account.salt;
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