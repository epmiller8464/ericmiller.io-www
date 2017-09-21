'use strict';

var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var notifier = require('../lib/notifier')();
/* GET home page. */
/* GET home page. */
router.get('/', function (req, res, next) {
  var rid = req.query.rid;
  if (!rid) {
    var _rid = req.session.rid = uuid.v4();
    res.cookie('rid', _rid);
    return res.redirect('/mebot?rid=' + _rid);
  }
  notifier.emit('bot:create-room', rid);
  res.render('mebot', { title: 'I am MeBot', phone_number: process.env.TWILIO_NUMBER, elasticNav: true });
});

module.exports = router;
//# sourceMappingURL=mebot.js.map