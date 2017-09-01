'use strict';

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var createAudioSignature = function createAudioSignature(_ref, cb) {
  var email = _ref.email,
      ip = _ref.ip,
      challenge_ts = _ref.challenge_ts;


  var jwtid = uuid.v4();

  var payload = {
    email: email,
    ip: ip,
    challenge_ts: challenge_ts,
    type: 'no-robot-token'
  };

  var jwtOpts = {
    expiresIn: 60 * 5,
    subject: email,
    jwtid: jwtid
  };
  jwt.sign(payload, process.env.JWT_SIGNATURE, jwtOpts, function (err, token) {
    if (err) return cb(err, null);

    return cb(null, { jwtid: jwtid, token: token });
  });
};

module.exports = { createAudioSignature: createAudioSignature };
//# sourceMappingURL=token.js.map