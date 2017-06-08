'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var url = require('url');

router.get('/', function (req, res, next) {
  res.render('voice-mail', { title: 'Express' });
});

module.exports = router;
//# sourceMappingURL=voice-mail.js.map