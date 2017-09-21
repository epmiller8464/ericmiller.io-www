'use strict';

var ChatLog = require('../data-store/memory-store')('chat-log');
var uuid = require('uuid');
var hmacSHA512 = require('crypto-js/hmac-sha512');
var Base64 = require('crypto-js/enc-base64');
// const nonce = require('nonce')

var hmac = function hmac(msg, user, nonce) {
  return Base64.stringify(hmacSHA512(nonce + ':' + user + ':' + msg, process.env.JWT_SIGNATURE));
};

var createChannel = function createChannel(channelName, from) {
  return new Promise(function (resolve, reject) {
    var _id = uuid.v4();
    var hash = hmac(channelName, from, _id);
    var session = {
      channel: channelName,
      creator: from,
      hash: hash,
      _id: _id
    };
    ChatLog.put(channelName, session, function (err, success) {
      if (err) return reject(err);

      return resolve(session);
    });
  });
};
var findChannel = function findChannel(channelId) {
  return new Promise(function (resolve, reject) {
    ChatLog.get(channelId, function (err, record) {
      // if (err)
      //   return reject(err)

      return resolve(err, record);
    });
  });
};

module.exports = { createChannel: createChannel, findChannel: findChannel };
//# sourceMappingURL=index.js.map