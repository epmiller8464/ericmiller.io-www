'use strict'
const event = require('events').EventEmitter
let _handler
module.exports = function () {
  class Notifier extends event {
    constructor () {
      super()
    }
  }

  _handler = _handler || new Notifier()
  return _handler
}
