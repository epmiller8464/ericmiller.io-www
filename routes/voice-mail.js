'use strict'
var express = require('express')
var router = express.Router()
const {VoiceMessage} = require('../lib/model')
const {createSignedUrl} = require('../lib/authorization')
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
    res.render('voice-mail', {title: 'Express', images: links})
  })
})

router.delete('/:id', (req, res, next) => {
  let fileName = ''

})

module.exports = router
