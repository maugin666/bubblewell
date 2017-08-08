var
  express = require('express'),
  fs = require('fs'),
  router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('offers.json', function (err, data) {
    var obj = JSON.parse(data);
    res.send(obj);
  });
});

router.get('/:id', function(req, res, next) {
  /*if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      var obj = JSON.parse(data);
      console.log(obj.offers);
      obj.offers.find(function(item) {
        if (item.offerId === req.params.id) {
          res.send(item);
        }
      });
    });
  }*/
  fs.readFile('offers.json', function (err, data) {
    var obj = JSON.parse(data);
    res.send(obj);
  });
});

router.post('/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      var obj = JSON.parse(data);
      obj.offers[req.params.id].comments.push(req.body);
      fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8');
      res.send(obj.offers);
    });
  }
});

module.exports = router;
