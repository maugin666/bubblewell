'use strict';

var
  express = require('express'),
  fs = require('fs'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

module.exports = router;
