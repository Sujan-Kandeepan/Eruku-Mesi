const express = require('express');
const router = express.Router();

let Photo = require('../model/photo.js');

router.post('/add', function(req, res){
    req.assert('name', 'Post username must be set').notEmpty();
    req.assert('url', 'Post lastname must be set').notEmpty();

    let errors = req.validationErrors();
    
    if(errors){
      console.log(errors);
    } else {
      let photo = new Photo(req.body);
      photo.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.status(200).json({ msg: 'photo created', photo });
        }
      })
    }
  });


router.get('/', function(req, res){
    Photo.find({}, function(err, photos){
        if (err){
        console.log(err);
        } else {
        res.json({photos:photos});
        }
    });
});

module.exports = router;
