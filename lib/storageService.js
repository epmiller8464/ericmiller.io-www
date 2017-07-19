'use strict'
// Load the AWS SDK for Node.js
// require('dotenv').config()
let AWS = require('aws-sdk')
let fs = require('fs')
let path = require('path')
let config = require('../config')
// Create S3 service object
// const ep = new AWS.Endpoint('ericmiller.io-audio.s3.amazonaws.com')
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

// call S3 to retrieve upload file to specified bucket
function upload (file, metaData, cb) {
  let filepath = file.search('uploads') >= 0 ? file : path.join(process.env.PWD, '/uploads/', file)

  let parsedPath = path.parse(filepath)

  var fileStream = fs.createReadStream(filepath)

  fileStream.on('error', function (err) {
    console.log('File Error', err)
    return cb(err)
  })
  let key = parsedPath.base// path.basename(parsedPath.name)
  const uploadParams = {
    Bucket: config.audio_bucket + '/voice-messages',
    Key: key,
    Body: fileStream,
    Metadata: metaData
  }
// call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log('Error', err)
      return cb(err)
    }
    if (data) {
      console.log('Upload Success', data.Location)
      return cb(null, data)
    }
  })
}

function list (cb) {
  var params = {
    Bucket: process.env.AWS_AUDIO_BUCKET
    // MaxKeys: 2
  }
  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
      return cb(err, null)
    } // an error occurred
    else {
      console.log(data)
      return cb(null, data)
    }
  })
}

const Service = {
  AWS: {
    upload,
    list
  }
}
module.exports = {Service}
