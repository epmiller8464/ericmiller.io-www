'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

module.exports = function () {
  //
  // let {moment} = require('moment')()
  let message = new Schema({
    from: String,
    to: String,
    text: String,
    delivered: {type: Boolean, default: false, required: true},
    read: {type: Boolean, default: false, required: true},
    seq: Number,
    timestamp: {type: Number, default: Date.now, required: true}
  }, {_id: false})

  let chatSchema = new Schema({
    channel: {type: String, required: true},
    creator: {type: String, required: true},
    sid: String,
    messages: {type: [message]},
    hash: {type: String, required: true, unique: true},
    meta: {type: mongoose.Schema.Types.Object}
  }, {collection: 'chat_log', timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('chat_log')
  } catch (e) {
    Model = mongoose.model('chat_log', chatSchema)
  }
  return Model
}
