'use strict'
var ChatLog = require('../data-store/memory-store')('chat-log')
const uuid = require('uuid')
const hmacSHA512 = require('crypto-js/hmac-sha512')
const Base64 = require('crypto-js/enc-base64')
// const nonce = require('nonce')

const hmac = (msg, user, nonce) => Base64.stringify(hmacSHA512(`${nonce}:${user}:${msg}`, process.env.JWT_SIGNATURE))

const createChannel = function (channelName, from) {
  return new Promise(function (resolve, reject) {
    let _id = uuid.v4()
    let hash = hmac(channelName, from, _id)
    let session = {
      channel: channelName,
      creator: from,
      hash: hash,
      _id
    }
    ChatLog.put(channelName, session, (err, success) => {
      if (err)
        return reject(err)

      return resolve(session)
    })
  })

}
const findChannel = function (channelId) {
  return new Promise(function (resolve, reject) {
    ChatLog.get(channelId, (err, record) => {
      // if (err)
      //   return reject(err)

      return resolve(err, record)
    })
  })
}

module.exports = {createChannel, findChannel}