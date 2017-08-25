'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../lib/model'),
    VoiceMessage = _require.VoiceMessage;

var _require2 = require('../lib/authorization'),
    createSignedUrl = _require2.createSignedUrl;

var nets = require('nets');

var _require3 = require('../level')('tokens'),
    level = _require3.level;

var _require4 = require('../lib/token'),
    createAudioSignature = _require4.createAudioSignature;

var csurf = require('csurf')({ cookie: true });

var _require$twiml = require('twilio').twiml,
    MessagingResponse = _require$twiml.MessagingResponse,
    VoiceResponse = _require$twiml.VoiceResponse;

router.get('/', csurf, function (req, res, next) {
  var links = [];
  VoiceMessage.find({ isTemp: false }, function (err, docs) {
    // let value = JSON.parse(data.value)
    if (err) res.render('voicemail', { title: 'Express', images: [] });
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
    res.render('voicemail', {
      title: 'Express',
      images: links,
      site_key: process.env.RECAPTCHA_SITE_KEY,
      csrfToken: req.csrfToken()
    });
  });
});

router.post('/recaptcha', csurf, function (req, res, next) {

  var body = { response: req.body['g-recaptcha-response'], remoteip: req.ip };
  var email = req.body.email;

  if (!body.response | !email) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  validateSubmitter(body.response, body.remoteip, function (err, result) {
    if (err || !result.success) return res.status(400).json(result);
    var token = createAudioSignature({ email: email, ip: req.ip, challenge_ts: result.challenge_ts });

    if (token.error) {
      return res.status(400).json({ error: 'Could not validate submitter' });
    }

    level.put(token.jwtid, token, function (e, success) {
      if (e) {
        return next(e);
      }

      return res.status(200).json(token);
    });
  });
});

router.post('/save-upload', function (req, res, next) {

  // validateSubmitter(req)
  res.json();
});

router.delete('/:id', function (req, res, next) {
  var fileName = '';
});

router.post('/webhook/incoming/voice', function (req, res, next) {
  var twiml = new VoiceResponse();
  // /webhook/incoming/voice
  twiml.say({ voice: 'alice', language: 'pt-BR', loop: 1 }, 'Oi, bom dia.');
  twiml.pause({ length: 1 });
  twiml.say({ voice: 'alice', language: 'en-US', loop: 1 }, 'When your near your computer visit my site at');
  // twiml.pause({length: 1})
  twiml.say({ voice: 'alice', language: 'en-US', loop: 1 }, 'www.ericmiller.io/voicemail');
  twiml.say({ voice: 'alice', language: 'en-US', loop: 1 }, 'and leave me a voice message.');
  twiml.say({ voice: 'alice', language: 'en-US', loop: 1 }, 'I wrote this with tweelio\'s voice api.');

  console.log(twiml.toString());
  // response.Say("Chapeau!", voice: "woman", language: "fr");

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  // res.writeHead(200, {'Content-Type': 'audio/wav'})

  res.end(twiml.toString());
});

router.post('/webhook/incoming/sms', function (req, res, next) {
  var twiml = new MessagingResponse();

  twiml.message('When your near your computer go https://www.ericmiller.io/voicemail and leave me a message.');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

router.post('/webhook/incoming/sms/error', function (req, res, next) {
  var twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

function validateSubmitter(recaptcha, ip, cb) {
  var url = 'https://www.google.com/recaptcha/api/siteverify?secret= ' + process.env.RECAPTCHA_SECRET + '&response=' + recaptcha + '&remoteip=' + ip;
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
//# sourceMappingURL=voicemail.js.map