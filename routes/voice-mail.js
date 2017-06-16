'use strict'
var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
const url = require('url')
const {level} = require('../level')('vm', {valueEncoding: 'json'})

router.get('/', function (req, res, next) {
  let links = []
  level.createReadStream({keys: true, values: true})
  .on('data', function (data) {
    console.log('value=', data)
    let value = JSON.parse(data.value)
    links.push({key: data.key, image: value.image, audio_path: value.audio_path})
  }).on('end', (err) => {
    console.log(links)
    // let links = fd.map((x) => {return `/uploads/${x}`})
    res.render('voice-mail', {title: 'Express', images: links})
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
  })

  // res.render('voice-mail', {title: 'Express'})
})

function loadVoiceMessages () {

}

module.exports = router
