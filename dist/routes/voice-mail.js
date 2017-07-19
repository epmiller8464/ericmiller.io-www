'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../lib/model'),
    VoiceMessage = _require.VoiceMessage;

var _require2 = require('../lib/authorization'),
    createSignedUrl = _require2.createSignedUrl;

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
    res.render('voice-mail', { title: 'Express', images: links });
  });
});

router.delete('/:id', function (req, res, next) {
  var fileName = '';
});

module.exports = router;
//# sourceMappingURL=voice-mail.js.map