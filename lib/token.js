'use strict'
let uuid = require('uuid')
let jwt = require('jsonwebtoken')
const createAudioSignature = function ({email, ip, challenge_ts}, cb) {

  let jwtid = uuid.v4()

  let payload = {
    email: email,
    ip: ip,
    challenge_ts: challenge_ts,
    type: 'no-robot-token'
  }

  let jwtOpts = {
    expiresIn: (60 * 5),
    subject: email,
    jwtid: jwtid
  }
  jwt.sign(payload, process.env.JWT_SIGNATURE, jwtOpts, function (err, token) {
    if (err)
      return cb(err, null)

    return cb(null, {jwtid, token})
  })
}

module.exports = {createAudioSignature}
