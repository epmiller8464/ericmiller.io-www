'use strict'
// require('dotenv').config()
let config = require('../config')
const AWS = require('aws-sdk')
const ep = new AWS.Endpoint('s3-us-west-1.amazonaws.com')
const s3 = new AWS.S3({apiVersion: '2006-03-01', endpoint: ep})

// const s3 = new AWS.S3({apiVersion: '2006-03-01'})

function createSignedUrl (key) {
  // let s3 = new AWS.S3({apiVersion: '2006-03-01'})
  // AWS.config.update({
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  // })
  // s3.service.endpoint.hostname == 'awsproxy.example.com'
  const signedUrlExpireSeconds = 86400 * 7

  const url = s3.getSignedUrl('getObject', {
    // Bucket: process.env.AWS_AUDIO_BUCKET,// + '/voice-messages',
    Bucket: config.audio_bucket,// + '/voice-messages',
    Key: key,
    Expires: signedUrlExpireSeconds
  })

  return url
}

module.exports = {createSignedUrl}