'use strict';

var dbConfig = require('../config').db;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function (cb) {

  var dbOptions = {
    useMongoClient: true,
    native_parser: true,
    poolSize: 5,
    keepAlive: 1,
    promiseLibrary: require('bluebird')
  };

  mongoose.connect(dbConfig.mongoDbUri, dbOptions).then(function (db) {
    db.on('open', console.info.bind(console, 'connection open'));
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function (callback) {
      console.log('open');
    });
    return cb(db);
  });
};
//# sourceMappingURL=db.js.map