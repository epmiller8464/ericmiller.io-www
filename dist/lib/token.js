'use strict';

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var createAudioSignature = function createAudioSignature(_ref) {
  var email = _ref.email,
      ip = _ref.ip,
      challenge_ts = _ref.challenge_ts;

  try {
    var jwtid = uuid.v4();

    var payload = {
      email: email,
      ip: ip,
      challenge_ts: challenge_ts,
      type: 'no-robot-token',
      id: jwtid
    };

    var jwtOpts = {
      expiresIn: '300s',
      subject: email
    };
    var token = jwt.sign(payload, process.env.JWT_SIGNATURE, jwtOpts);
    return { jwtid: jwtid, token: token };
  } catch (e) {
    return { error: e };
  }
};

module.exports = { createAudioSignature: createAudioSignature };
//# sourceMappingURL=token.js.map