'use strict'
var express = require('express')
var router = express.Router()
const uuid = require('uuid')
const notifier = require('../lib/notifier')()
/* GET home page. */
/* GET home page. */
router.get('/', function (req, res, next) {
  let rid = req.query.rid
  if (!rid) {
    let rid = req.session.rid = uuid.v4()
    res.cookie('rid', rid)
    return res.redirect(`/mebot?rid=${rid}`)
  }
  notifier.emit('bot:create-room', rid)
  res.render('mebot', {title: 'I am MeBot', phone_number: process.env.TWILIO_NUMBER})
})

module.exports = router
