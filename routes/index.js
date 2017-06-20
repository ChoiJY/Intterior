var express = require('express');
var users = require('./users');
var rooms = require('./rooms');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {

  users.login(req, res);
});

router.post('/load', function(req, res, next){
  console.log(req.param("id"));
  rooms.getAssets(req, res);
});


router.post('/save', function(req, res, next){
  console.log("세이브 아이디 : " + req.param("id"));
  rooms.setAssets(req, res);
});

router.post('/community', function(req, res, next){
  users.listuser(req, res);
});

router.post('/facebook/community', function(req, res, next){
  users.listFriends(req, res);
});


module.exports = router;
