const express = require('express');
const router = express.Router();

let Account = require('../model/account.js');

router.post('/add', function(req, res){
    req.assert('username', 'Post username must be set').notEmpty();
    req.assert('firstName', 'Post firstName must have content').notEmpty();
    req.assert('lastName', 'Post lastname must be set').notEmpty();
    req.assert('phone', 'Post phone must have content').notEmpty();
    req.assert('hash', 'Post hash must be set').notEmpty();
    req.assert('salt', 'Post salt must have content').notEmpty();
  
    let errors = req.validationErrors();
    
    if(errors){
      console.log(errors);
    } else {
      let account = new Account(req.body);
      account.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.status(200).json({ msg: 'account created', account });
        }
      })
    }
  });


router.get('/', function(req, res){
    Account.find({}, function(err, accounts){
        if (err){
        console.log(err);
        } else {
        res.json({accounts:accounts});
        }
    });
});

module.exports = router;
