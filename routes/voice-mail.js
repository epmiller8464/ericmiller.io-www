'use strict'
var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
const url = require('url')

router.get('/', function (req, res, next) {
  res.render('voice-mail', {title: 'Express'})
})



module.exports = router
