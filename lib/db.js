'use strict'
let dbConfig = require('../config').db
let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = function (cb) {

  let dbOptions = {
    useMongoClient: true,
    native_parser: true,
    poolSize: 5,
    keepAlive: 1,
    promiseLibrary: require('bluebird')
  }

  mongoose.connect(dbConfig.mongoDbUri, dbOptions)
  .then((db) => {
    db.on('open', console.info.bind(console, 'connection open'))
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', (callback) => {
      console.log('open')
    })
    return cb(db)
  })
}
