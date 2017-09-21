'use strict'
let level = require('levelup')
let instance
let instances

function db (name) {

  instances = instances || {}
  instance = instances[name]
  if (instance)
    return instance

  instance = level(name)
  instance.on('ready', function () {
    console.log('level db ready')
  }).on('closing', () => {
    console.log('closing db')
  })
  instances[name] = instance
  return instance
}

module.exports = db
