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
    // console.log('value=', data)
    let value = JSON.parse(data.value)
    let waveForm = []
    for (var key in value.waveForm) {
      if (value.waveForm[key])
        waveForm.push(value.waveForm[key])
    }
    waveForm = waveForm.filter((i, v) => {if (v) return v }).reverse()
    links.push({key: data.key, image: value.image, audio_path: value.audio_path, waveForm: waveForm.join(',')})
  }).on('end', (err) => {
    // console.log(links)
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

router.delete('/:id', (req, res, next) => {
  let fileName = ''
  level.get(req.body.key, function (err, value) {
    if (err) {
      res.status(200).json({
        success: false,
        message: `Error deleting DB ref for key: ${req.body.key}, message: ${err.message}`
      })
    }
    fileName = value.audio_path
    level.del(req.body.key, function (err) {
      if (err) {
        res.status(200).json({
          success: false,
          message: `Error deleting DB ref for key: ${req.body.key}, message: ${err.message}`
        })
      }
      deleteFileOnDisk(fileName, (err, result) => {

        if (err) {
          res.status(200).json({
            success: false,
            message: `Error file on disk for file: ${req.body.fileName}, message: ${err.message}`
          })
        }
        res.status(200).json({success: true, message: 'Recording deleted.'})
      })
    })
  })
})

function deleteFileOnDisk (fileName, cb) {
  fs.unlink(fileName.search('./uploads') >= 0 ? fileName : `./uploads/${fileName}`, (err) => {
    if (err) {
      return cb(err)
    }
    console.log(`successfully deleted ${fileName}`)
    return cb(null, true)
  })
}

module.exports = router
