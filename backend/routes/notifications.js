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

router.post("/edit/:id", function (req, res) {
  let notification = req.body;
  let query = { _id: req.params.id };

  Notification.update(query, notification, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res
        .status(200)
        .json({ msg: "notification successfully updated", notification: notification });
    }
  });
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

router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Notification.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: "notification deleted successfully!" });
  });
});

module.exports = router;
