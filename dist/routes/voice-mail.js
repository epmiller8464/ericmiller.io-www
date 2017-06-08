'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var url = require('url');

router.get('/', function (req, res, next) {
  fs.readdir('./uploads/', function (error, fd) {

    // let links = fd.filter((x) => { if (/\.wav/.test()) return x }).map((x) => {return `/uploads/${x}`})
    var links = fd.filter(function (s) {
      if (/\.wav/.test(s)) return s;
    }).map(function (x) {
      return '/uploads/' + x;
    });
    console.log(links);
    // let links = fd.map((x) => {return `/uploads/${x}`})
    res.render('voice-mail', { title: 'Express', images: links });
  });
  // res.render('voice-mail', {title: 'Express'})
});

function loadVoiceMessages() {}

module.exports = router;
//# sourceMappingURL=voice-mail.js.map