'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../lib/model'),
    VoiceMessage = _require.VoiceMessage;

var _require2 = require('../lib/authorization'),
    createSignedUrl = _require2.createSignedUrl;

var nets = require('nets');
router.get('/', function (req, res, next) {
  var links = [];
  VoiceMessage.find({ isTemp: false }, function (err, docs) {
    // let value = JSON.parse(data.value)
    if (err) res.render('voice-mail', { title: 'Express', images: [] });
    links = docs.map(function (vm) {
      return vm.toObject();
    }).map(function (vm) {
      var waveForm = [];
      for (var key in vm.waveForm) {
        if (vm.waveForm[key]) waveForm.push(vm.waveForm[key]);
      }
      waveForm = waveForm.filter(function (i, v) {
        if (v) return v;
      }).reverse();
      var surl = createSignedUrl(vm.meta.Key);
      return { key: vm._id, image: vm.image, audio_path: surl, waveForm: waveForm.join(',') };
    });
    res.render('voice-mail', { title: 'Express', images: links, site_key: process.env.RECAPTCHA_SITE_KEY });
  });
});

router.post('/recaptcha', function (req, res, next) {

  var body = { response: req.body['g-recaptcha-response'], remoteip: req.ip };
  var email = req.body.email;

  if (!body.response | !email) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  validateSubmitter(body.response, body.remoteip, function (err, result) {
    if (err) return res.status(400).json(result);

    return res.status(200).json(result);
  });
});

router.post('/save-upload', function (req, res, next) {

  // validateSubmitter(req)
  res.json();
});

router.delete('/:id', function (req, res, next) {
  var fileName = '';
});

function validateSubmitter(recaptcha, ip, cb) {
  var url = 'https://www.google.com/recaptcha/api/siteverify?secret= ' + process.env.RECAPTCHA_SECRET + '&response=' + recaptcha + '&remoteip=' + ip;
  // let url = `https://www.google.com/recaptcha/api/siteverify`

  var request = {
    url: url,
    method: 'POST',
    encoding: undefined
  };
  nets(request, function (err, res, body) {
    // console.log(err)
    return cb(err, JSON.parse(body));
  });
}

module.exports = router;
//# sourceMappingURL=voice-mail.js.map