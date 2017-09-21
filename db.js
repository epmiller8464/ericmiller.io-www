'use strict'
let levelup = require('levelup')
let instance
let instances

function db (name) {

  instances = instances || {}
  instance = instances[name]
  if (instance)
    return instance

  instance = levelup(`./${name}`)
  instance.on('ready', function () {
    console.log('levelup ready')
  })
  .on('closing', () => {
    console.log('closing db')
  })
  instances[name] = instance
  return instance
}

module.exports = db
