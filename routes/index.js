var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*fs.readFile('offers.json', function (err, data) {
    var obj = JSON.parse(data);
    res.send(data);
  });*/
  /*fs.readFile('offers.json', function (err, data) {
    var obj = JSON.parse(data);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(obj);*/
    //var hamlView = fs.readFileSync('views/index.haml', 'utf8');
    //res.send(haml.render(hamlView, {locals: obj}));
  //});
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

module.exports = router;
