'use strict'
const uuid = require('uuid')

const {writeToDisk, updateAndRemoveFile} = require('./lib/vmware')
const {Service} = require('./lib/storageService')
const jwt = require('jsonwebtoken')
// const exec = require('child_process').exec
// const FFmpeg = require('fluent-ffmpeg')
// const {level} = require('./level')('vm', {valueEncoding: 'json'})
const {VoiceMessage} = require('./lib/model')
const ch = require('./lib/callHandler')()
require('./lib/db')(() => {

})

function server (app) {

  // var io = require('socket.io').listen(app)

  var opts = {
    transports: [
      'polling',
      'xhr-polling',
      'jsonp-polling'
    ],
    log: true,
    origins: '*:*'
  }// 'disconnect' EVENT will work only with 'websocket
  let io = require('socket.io')(app, opts)
  io.sockets.on('connection', function (socket) {

    socket.on('message', function (data) {
      // add token logic
      // data.token
      if (!data.audio.token) {
        socket.emit('ffmpeg-error', 'Cannot save unvalidated file must contain a valid and signed JWT.')
        return
      }

      let sign = data.audio.token
      console.log(sign)
      let validationResults = jwt.verify(sign.token, process.env.JWT_SIGNATURE, {jwtid: sign.jwtid}, (err, payload) => {

        if (err) {
          socket.emit('ffmpeg-error', 'Could not validate file signature.')
          return
        }

        var fileName = uuid.v4()

        socket.emit('ffmpeg-output', 0)
        // console.log(data)
        // console.log('my nigga we have the image %s', data.audio.image)
        writeToDisk(data.audio, fileName + '.wav', (error, doc) => {

          if (error) {
            socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + error.message)
            return
          }
          let vm = doc
          socket.emit('merged', {fileName: fileName + '.wav', id: vm._id, key: vm.filename})
        })
      })
    })

    socket.on('save-upload', function (data) {

      let filename = data.filename
      let id = data.id
      Service.AWS.upload(filename, {id}, (err, result) => {
        console.log(err)
        console.log(result)

        updateAndRemoveFile(filename, id, result, (err, vm) => {
          socket.emit('uploaded', vm)
        })
      })
    })

    ch.on('new-call', (c) => {
      socket.emit('incoming-call', c)
      console.log('incoming-call %s', c)
    })
  })
}

module.exports = server
