'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var event = require('events').EventEmitter;

var CallHandler = function (_event) {
  _inherits(CallHandler, _event);

  function CallHandler() {
    _classCallCheck(this, CallHandler);

    return _possibleConstructorReturn(this, (CallHandler.__proto__ || Object.getPrototypeOf(CallHandler)).call(this));
  }

  return CallHandler;
}(event);

var _callHandler = void 0;

module.exports = function () {
  if (_callHandler) {
    return _callHandler;
  } else {
    _callHandler = new CallHandler();
  }
  return _callHandler;
};
//# sourceMappingURL=callHandler.js.map