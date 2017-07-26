'use strict';
var
  jsonServer = require('json-server'),
  server = jsonServer.create(),
  router = jsonServer.router('offers.json'),
  middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, function () {
  console.log('JSON Server is running');
});
