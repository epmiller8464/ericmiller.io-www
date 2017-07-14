'use strict';
// Load the AWS SDK for Node.js

var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');

// Create S3 service object
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// call S3 to retrieve upload file to specified bucket
function upload(file, metaData, cb) {

  var fileStream = fs.createReadStream(file);

  fileStream.on('error', function (err) {
    console.log('File Error', err);
    return cb(err);
  });
  var key = path.basename(file);
  var uploadParams = {
    Bucket: process.env.AWS_AUDIO_BUCKET,
    Key: key,
    Body: fileStream,
    Metadata: metaData
  };
  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log('Error', err);
      return cb(err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      return cb(null, data);
    }
  });
}
var Service = {
  AWS: {
    upload: upload
  }
};
module.exports = { Service: Service };
//# sourceMappingURL=storageService.js.map