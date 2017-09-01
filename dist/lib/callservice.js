'use strict';

var Voice = {
  loadRecording: function loadRecording(cid) {
    var transcribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  },
  notify: function notify(to, from) {}
};

module.exports = { Voice: Voice };
//# sourceMappingURL=callservice.js.map