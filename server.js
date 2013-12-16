'use strict';

var http = require('http');
var connect = require('connect');
var request = require('request');
var mime = require('mime');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use('/proxy', function (req, res, next) {
    var url = req.originalUrl;
    var file = /\?file=([^&]+)/
    var match = url.match(file);
    var filename = match[1];

    if (filename) {
      res.setHeader('Content-type', mime.lookup(filename));
      request(filename).pipe(res);
    } else {
      next();
    }
  });

http.createServer(app).listen(3000);
