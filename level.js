'use strict'
module.exports = function (name, options) {
  const db = require('./db')(name, options)
  let encoding = {valueEncoding: options.encoding || 'json'}
  const level = {
    put (key, value, cb) {
      db.put(key, value, encoding, function (err) {

        if (err) {
          console.error(err)
          return cb(err)
        }
        return cb(null, true)
      })
    },
    get (key, cb) {
      db.get(key, encoding, function (err, value) {

        if (err) {
          console.error(err)
          return cb(err)
        }
        return cb(null, value)
      })
    },
    del (key, cb) {
      db.del(key, function (err) {

        if (err) {
          console.error(err)
          return cb(err)
        }
        return cb(null, true)
      })
    },
    createReadStream({keys, values}){
      return db.createReadStream({keys, values})
    }
  }
  return {level}
}
