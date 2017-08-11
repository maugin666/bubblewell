var
  express = require('express'),
  fs = require('fs'),
  router = express.Router();

function readFileAndSendResponse(res) {
  fs.readFile('offers.json', function (err, data) {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    } else {
      res.send(err);
    }
  })
}

function writeToFileAndSendResponse(obj, res) {
  fs.writeFile('offers.json', JSON.stringify(obj), 'utf-8', function (err) {
    if (err) console.log(err);
  });
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(obj));
  res.end();
}

function readFileAndChangeData(req, res, changeData) {
  if (req.params.id !== undefined) {
    fs.readFile('offers.json', function (err, data) {
      if (!err) {
        var obj = JSON.parse(data);
        changeData(req, obj);
        writeToFileAndSendResponse(obj, res);
      } else {
        res.send(err);
      }
    });
  }
}

/* GET offers listing. */
router
  .get('/', function(req, res) {
  readFileAndSendResponse(res);
})
  .get('/:id', function(req, res) {
  readFileAndSendResponse(res);
})
  .post('/:id/comment', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].comments.push(req.body);
    });
})
  .post('/:id/review', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].reviews.push(req.body);
    });
})
  .put('/:id/comment', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].comments[req.body.index].isDeleted = true;
    });
})
  .put('/:id/review', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].reviews[req.body.index].isDeleted = true;
    });
})
  .put('/:id', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].isDeleted = true;
    });
})
  .post('/:id/likes', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].likes.push(req.body);
    });
})
  .post('/:id/added', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].added.push(req.body);
    });
  })
  .delete('/:id/likes', function(req, res) {
    readFileAndChangeData(req, res, function (req, obj) {
      obj.offers[req.params.id].likes.find(function (item, i) {
        if (item.userId == req.body.userId) {
          obj.offers[req.params.id].likes.splice(i, 1);
        }
      });
    });
  })
  .delete('/:id/added', function(req, res) {
  readFileAndChangeData(req, res, function (req, obj) {
    obj.offers[req.params.id].added.find(function (item, i) {
      if (item.userId == req.body.userId) {
        obj.offers[req.params.id].added.splice(i, 1);
      }
    });
  });
});

module.exports = router;
