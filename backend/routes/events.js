const express = require('express');
const router = express.Router();

let Event = require('../model/event.js');

router.post('/add', function(req, res){
    req.assert('name', 'Post name must be set').notEmpty();
  
    let errors = req.validationErrors();
    
    if(errors){
      console.log(errors);
    } else {
      let event = new Event(req.body);
      event.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.status(200).json({ msg: 'event created', event });
        }
      })
    }
  });


router.get('/', function(req, res){
    Event.find({}, function(err, events){
        if (err){
        console.log(err);
        } else {
        res.json({events:events});
        }
    });
});

module.exports = router;
