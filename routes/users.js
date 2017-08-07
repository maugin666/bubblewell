var
  express = require('express'),
  fs = require('fs'),
  router = express.Router();


router.get('/', function(req, res, next) {
  fs.readFile('users.json', function (err, data) {
    var obj = JSON.parse(data);
    res.send(obj);
  });
});

router.post('/user', function(req, res, next) {
  fs.readFile('users.json',function(err, content){
    if (err) throw err;
    var parseJson = JSON.parse(content);
    parseJson.users.push(req.body);
    fs.writeFile('users.json', JSON.stringify(parseJson),function(err){
      if(err) throw err;
      res.sendStatus(200);
    })
  });
});

module.exports = router;
