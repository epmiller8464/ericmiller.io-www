'use strict';

/**
 * Created by ghostmac on 7/14/17.
 */
var _require = require('./storageService'),
    Service = _require.Service;

var path = require('path');
var optimist = require('optimist');
var argv = optimist.argv;

if (argv.file) {
  var file = path.join(process.env.PWD, '/uploads/', argv.file);
  console.log(file);
  console.log(path.parse(file));
  var parsedPath = path.parse(file);
  Service.AWS.upload(file, { metadata: file }, function (err, result) {
    console.log(err);
    console.log(result);
  });
} else if (argv.list) {
  Service.AWS.list(function (err, result) {
    console.log(err);
    console.log(result);
  });
}
//# sourceMappingURL=micro-s3-cli.js.map