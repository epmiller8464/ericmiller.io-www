'use strict'
var express = require('express')
var router = express.Router()
const {VoiceMessage, CallLog} = require('../lib/model')
const {createSignedUrl} = require('../lib/authorization')
const nets = require('nets')
const {level} = require('../level')('tokens')
const {createAudioSignature} = require('../lib/token')
const moment = require('moment')
var csurf = require('csurf')({cookie: true})
const {MessagingResponse, VoiceResponse} = require('twilio').twiml
const ch = require('../lib/callevent')()
const {sendSmsNotifications} = require('../lib/voice-service')
router.get('/', csurf, function (req, res, next) {
  let links = []
  VoiceMessage.find({isTemp: false}, (err, docs) => {
    // let value = JSON.parse(data.value)
    if (err) res.render('voicemail', {title: 'Express', images: []})
    links = docs.map((vm) => {return vm.toObject()}).map((vm) => {
      let waveForm = []
      for (var key in vm.waveForm) {
        if (vm.waveForm[key])
          waveForm.push(vm.waveForm[key])
      }
      waveForm = waveForm.filter((i, v) => {if (v) return v }).reverse()
      let surl = createSignedUrl(vm.meta.Key)
      return {
        key: vm._id,
        image: vm.image,
        audio_path: surl,
        waveForm: waveForm.join(','),
        date: moment(vm.created_on).format('LLL')
      }
    })
    links = links.reverse()
    res.render('voicemail', {
      title: 'Express',
      images: links,
      site_key: process.env.RECAPTCHA_SITE_KEY,
      csrfToken: req.csrfToken()
    })
  })
})

router.post('/recaptcha', csurf, (req, res, next) => {

  let body = {response: req.body['g-recaptcha-response'], remoteip: req.ip}
  let email = req.body.email

  if ((!body.response | !email)) {
    return res.status(400).json({error: 'Invalid parameters'})
  }

  validateSubmitter(body.response, body.remoteip, (err, result) => {
    if (err || !result.success)
      return res.status(400).json(result)
    createAudioSignature({email: email, ip: req.ip, challenge_ts: result.challenge_ts}, (err, token) => {

      if (err) {
        return res.status(400).json({error: 'Could not validate submitter'})
      }

      level.put(token.jwtid, token, (e, success) => {
        if (e) {
          return next(e)
        }

        return res.status(200).json(token)
      })
    })
  })
})

// http://dev.ericmiller.io/voicemail/webhook/status/voice
router.post('/webhook/call/status', (req, res, next) => {
  let call = req.body
  console.log(req.body)
  if (call.Direction !== 'inbound') {
    res.writeHead(200)
    return res.end()
  }

  // response.Say("Chapeau!", voice: "woman", language: "fr");
  let cl = new CallLog({
    phone_number: call.From,
    from_country: call.FromCountry,
    timestamp: moment(call.Timestamp).valueOf(),
    call_sid: call.CallSid,
    call_meta: call
  })

  cl.save((err, doc) => {

    if (doc) {
      //todo: send sms
      // ch.emit('new-call', doc.toObject())
      process.nextTick((_call) => {
        sendSmsNotifications('Eric will get back to you ASAP, thanks for stopping by.', _call.From)
        sendSmsNotifications('You have a new voip mail', process.env.ME)
      }, call)
    }

    res.writeHead(200)
    res.end()
  })
})

router.post('/webhook/incoming/voice', (req, res, next) => {
  const twiml = new VoiceResponse()
  // /webhook/incoming/voice
  twiml.say({voice: 'alice', language: 'pt-BR', loop: 1}, 'Bom dia.')
  // twiml.pause({length: 1})
  twiml.say({
    voice: 'alice',
    language: 'en-US',
    loop: 1
    // }, 'When your near your computer visit my site at www.ericmiller.io/voicemail and leave me a message. This was built with tweelio\'s voice api. Chow')
  }, 'You have reached Eric Millers voip number leave me a message, once i have read it you will receive a text and I will get back to you ASAP if you are human or visit my site at www.ericmiller.io/voicemail.')

  twiml.record({transcribe: true})

  twiml.hangup()
  console.log(twiml.toString())
  // response.Say("Chapeau!", voice: "woman", language: "fr");

  res.writeHead(200, {'Content-Type': 'text/xml'})
  // res.writeHead(200, {'Content-Type': 'audio/wav'})

  res.end(twiml.toString())
})

router.post('/webhook/incoming/sms', (req, res, next) => {
  const twiml = new MessagingResponse()

  twiml.message('When your near your computer go https://www.ericmiller.io/voicemail and leave me a message.')

  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
})

router.post('/webhook/incoming/sms/error', (req, res, next) => {
  const twiml = new MessagingResponse()

  twiml.message('The Robots are coming! Head for the hills!')

  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
})

function validateSubmitter (recaptcha, ip, cb) {
  let url = `https://www.google.com/recaptcha/api/siteverify?secret= ${process.env.RECAPTCHA_SECRET}&response=${recaptcha}&remoteip=${ip}`
  let request = {
    url: url,
    method: 'POST',
    encoding: undefined
  }
  nets(request, (err, res, body) => {
    // console.log(err)
    return cb(err, JSON.parse(body))
  })
}

module.exports = router
