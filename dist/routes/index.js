'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var url = require('url');
/* GET home page. */
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/voice-mail', function (req, res, next) {
  res.render('voice-mail', { title: 'Express' });
});
router.use('/uploads', function (req, response, next) {
  var uri = url.parse(req.url).pathname,
      filename = path.join(process.cwd() + '/uploads', uri);
  // var filename = `./../uploads${req.url}`
  fs.exists(filename, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      response.write('404 Not Found: ' + filename + '\n');
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, 'binary', function (err, file) {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.write(err + '\n');
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, 'binary');
      response.end();
    });
  });
});
module.exports = router;
//# sourceMappingURL=index.js.map