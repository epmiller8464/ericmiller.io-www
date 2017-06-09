'use strict'
var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
const url = require('url')

router.get('/', function (req, res, next) {
  fs.readdir('./uploads/ig', (error, fd) => {

    // let links = fd.filter((x) => { if (/\.wav/.test()) return x }).map((x) => {return `/uploads/${x}`})
    let links = fd.filter(function (s) {if (/\.jpg/.test(s))return s }).map((x) => {return `/uploads/ig/${x}`})
    // let links = fd.filter(function (s)  {if (/\.wav/.test(s))return s }).map((x) => {return `/uploads/${x}`})
    console.log(links)
    // let links = fd.map((x) => {return `/uploads/${x}`})
    res.render('voice-mail', {title: 'Express', images: links})
  })
  // res.render('voice-mail', {title: 'Express'})
})

function loadVoiceMessages () {

}

module.exports = router
