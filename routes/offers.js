var
  express = require('express'),
  fs = require('fs'),
  router = express.Router();

/* GET offers listing. */
router.get('/', function(req, res, next) {
  fs.readFile('offers.json', function (err, data) {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    } else {
      res.send(err);
    }
  });
});

router.get('/:id', function(req, res, next) {
  fs.readFile('offers.json', function (err, data) {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    } else {
      res.send(err);
    }
  });
});

router.post('/comment/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        obj.offers[req.params.id].comments.push(req.body);
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

router.post('/review/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        obj.offers[req.params.id].reviews.push(req.body);
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

router.put('/comment/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        obj.offers[req.params.id].comments[req.body.index].isDeleted = true;
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

router.put('/review/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        obj.offers[req.params.id].reviews[req.body.index].isDeleted = true;
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

router.put('/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        obj.offers[req.params.id].isDeleted = true;
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

router.post('/likes/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        obj.offers[req.params.id].likes.push(req.body);
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

router.delete('/likes/:id', function(req, res, next) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var
          obj = JSON.parse(data);
        obj.offers[req.params.id].likes.find(function (item, i) {
            if (item.userId == req.body.userId) {
              obj.offers[req.params.id].likes.splice(i, 1);
            }
        });
        fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
          if (err) console.log(err);
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      } else {
        res.send(err);
      }
    });
  }
});

module.exports = router;
