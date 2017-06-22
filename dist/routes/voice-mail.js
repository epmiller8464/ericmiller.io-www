'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var url = require('url');

var _require = require('../level')('vm', { valueEncoding: 'json' }),
    level = _require.level;

router.get('/', function (req, res, next) {
  var links = [];
  level.createReadStream({ keys: true, values: true }).on('data', function (data) {
    // console.log('value=', data)
    var value = JSON.parse(data.value);
    links.push({ key: data.key, image: value.image, audio_path: value.audio_path, waveForm: value.waveForm });
  }).on('end', function (err) {
    // console.log(links)
    // let links = fd.map((x) => {return `/uploads/${x}`})
    res.render('voice-mail', { title: 'Express', images: links });
    // fs.readdir('./uploads/ig', (error, fd) => {
    //
    //   if (!fd) {
    //     return res.render('voice-mail', {title: 'Express', images: []})
    //   }
    //   // let links = fd.filter((x) => { if (/\.wav/.test()) return x }).map((x) => {return `/uploads/${x}`})
    //   let links = fd.filter(function (s) {if (/\.jpg/.test(s))return s }).map((x) => {return `/uploads/ig/${x}`})
    //   // let links = fd.filter(function (s)  {if (/\.wav/.test(s))return s }).map((x) => {return `/uploads/${x}`})
    //
    // })
  });

  // res.render('voice-mail', {title: 'Express'})
});

router.post('/delete/:id', function (req, res, next) {

  res.status(200).json({ success: true });
});

function loadVoiceMessages() {}

module.exports = router;
//# sourceMappingURL=voice-mail.js.map