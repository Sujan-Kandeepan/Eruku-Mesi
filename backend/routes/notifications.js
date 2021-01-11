const express = require('express');
const router = express.Router();

let Notification = require('../model/notification.js');

router.post('/add', function(req, res){
    req.assert('receiver', 'Post receiver must be set').notEmpty();
    req.assert('body', 'Post body must have content').notEmpty();

    let errors = req.validationErrors();
    
    if(errors){
      console.log(errors);
    } else {
      let notification = new Notification(req.body);
      notification.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.status(200).json({ msg: 'notification created', notification });
        }
      })
    }
  });


router.get('/', function(req, res){
    Notification.find({}, function(err, notifications){
        if (err){
        console.log(err);
        } else {
        res.json({notifications:notifications});
        }
    });
});

module.exports = router;
