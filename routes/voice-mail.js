'use strict'
var express = require('express')
var router = express.Router()
const {VoiceMessage} = require('../lib/model')
const {createSignedUrl} = require('../lib/authorization')
const nets = require('nets')
router.get('/', function (req, res, next) {
  let links = []
  VoiceMessage.find({isTemp: false}, (err, docs) => {
    // let value = JSON.parse(data.value)
    if (err) res.render('voice-mail', {title: 'Express', images: []})
    links = docs.map((vm) => {return vm.toObject()}).map((vm) => {
      let waveForm = []
      for (var key in vm.waveForm) {
        if (vm.waveForm[key])
          waveForm.push(vm.waveForm[key])
      }
      waveForm = waveForm.filter((i, v) => {if (v) return v }).reverse()
      let surl = createSignedUrl(vm.meta.Key)
      return {key: vm._id, image: vm.image, audio_path: surl, waveForm: waveForm.join(',')}
    })
    res.render('voice-mail', {title: 'Express', images: links, site_key: process.env.RECAPTCHA_SITE_KEY})
  })
})

router.post('/recaptcha', (req, res, next) => {

  let body = {response: req.body['g-recaptcha-response'], remoteip: req.ip}
  let email = req.body.email

  if ((!body.response | !email)) {
    return res.status(400).json({error: 'Invalid parameters'})
  }

  validateSubmitter(body.response, body.remoteip, (err, result) => {
    if (err)
      return res.status(400).json(result)

    return res.status(200).json(result)
  })

})

router.post('/save-upload', (req, res, next) => {

  // validateSubmitter(req)
  res.json()

})

router.delete('/:id', (req, res, next) => {
  let fileName = ''

})

function validateSubmitter (recaptcha, ip, cb) {
  let url = `https://www.google.com/recaptcha/api/siteverify?secret= ${process.env.RECAPTCHA_SECRET}&response=${recaptcha}&remoteip=${ip}`
  // let url = `https://www.google.com/recaptcha/api/siteverify`

  let request = {
    url: url,
    method: 'POST',
    encoding: undefined,
    // body: JSON.stringify({secret: process.env.RECAPTCHA_SECRET, response: recaptcha, remoteip: ip})
  }
  nets(request, (err, res, body) => {
    // console.log(err)
    return cb(err, JSON.parse(body))
  })
}

module.exports = router
