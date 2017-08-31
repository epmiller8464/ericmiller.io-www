'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
  // let {moment} = require('moment')()
  var callLogSchema = new Schema({
    read: { type: Boolean, default: false },
    phone_number: String,
    from_country: String,
    call_sid: String,
    recording_sid: String,
    transcription_sid: String,
    call_status: String,
    timestamp: Number,
    read_timestamp: Number,
    call_meta: { type: mongoose.Schema.Types.Object }
  }, { collection: 'call_log' });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('call_log');
  } catch (e) {
    Model = mongoose.model('call_log', callLogSchema);
  }
  return Model;
};
//# sourceMappingURL=call-log.js.map