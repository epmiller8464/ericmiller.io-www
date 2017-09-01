'use strict'
const event = require('events').EventEmitter
let _handler
module.exports = function () {
  class CallEmitter extends event {
    constructor () {
      super()
    }
  }

  _handler = _handler || new CallEmitter()
  return _handler
}
