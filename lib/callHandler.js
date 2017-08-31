'use strict'
const event = require('events').EventEmitter

class CallHandler extends event {
  constructor () {
    super()
  }
}

let _callHandler

module.exports = function () {
  if (_callHandler) {
    return _callHandler
  } else {
    _callHandler = new CallHandler()
  }
  return _callHandler
}