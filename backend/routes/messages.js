const express = require('express');
const router = express.Router();

let Message = require('../model/message.js');

router.post('/add', function(req, res){
    req.assert('from', 'Post from must be set').notEmpty();
    req.assert('message', 'Post message must be set').notEmpty();
  
    let errors = req.validationErrors();
    
    if(errors){
      console.log(errors);
    } else {
      let message = new Message(req.body);
      message.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.status(200).json({ msg: 'message created', message });
        }
      })
    }
  });


router.get('/', function(req, res){
    Message.find({}, function(err, messages){
        if (err){
        console.log(err);
        } else {
        res.json({messages:messages});
        }
    });
});

module.exports = router;
