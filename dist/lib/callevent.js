'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var event = require('events').EventEmitter;
var _handler = void 0;
module.exports = function () {
  var CallEmitter = function (_event) {
    _inherits(CallEmitter, _event);

    function CallEmitter() {
      _classCallCheck(this, CallEmitter);

      return _possibleConstructorReturn(this, (CallEmitter.__proto__ || Object.getPrototypeOf(CallEmitter)).call(this));
    }

    return CallEmitter;
  }(event);

  _handler = _handler || new CallEmitter();
  return _handler;
};
//# sourceMappingURL=callevent.js.map