'use strict'
let uuid = require('uuid')
let jwt = require('jsonwebtoken')
const createAudioSignature = function ({email, ip, challenge_ts}) {
  try {
    let jwtid = uuid.v4()

    let payload = {
      email: email,
      ip: ip,
      challenge_ts: challenge_ts,
      type: 'no-robot-token',
      id: jwtid
    }

    let jwtOpts = {
      expiresIn: '300s',
      subject: email
    }
    let token = jwt.sign(payload, process.env.JWT_SIGNATURE, jwtOpts)
    return {jwtid, token}
  } catch (e) {
    return {error: e}
  }
}

module.exports = {createAudioSignature}
