'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
  // let {moment} = require('moment')()
  var voiceMessageSchema = new Schema({
    title: String,
    fromEmail: { type: String, trim: true, lowercase: true, required: true, minLength: 1, match: /.+\@.+\..+/ },
    comments: [{ type: mongoose.Schema.Types.Object }],
    filename: String,
    image: String,
    waveForm: { type: mongoose.Schema.Types.Object },
    isTemp: { type: Boolean, default: true },
    createDate: {
      type: Date
      // get: function () { return this.__createDate },
      // set: function (v) {
      //   this.__createDate = new Date(v)
      // }
    },
    read: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    location: String,
    meta: { type: mongoose.Schema.Types.Object }
  }, { collection: 'voice_message' });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('voice_message');
  } catch (e) {
    Model = mongoose.model('voice_message', voiceMessageSchema);
  }
  return Model;
};
//# sourceMappingURL=voice-message.js.map