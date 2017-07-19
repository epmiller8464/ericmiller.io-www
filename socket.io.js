'use strict'
const uuid = require('uuid')

const {writeToDisk, updateAndRemoveFile} = require('./lib/VmWare')
const {Service} = require('./lib/storageService')
// const exec = require('child_process').exec
// const FFmpeg = require('fluent-ffmpeg')
// const {level} = require('./level')('vm', {valueEncoding: 'json'})
const {VoiceMessage} = require('./lib/model')
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
  })

// isn't it redundant?
// app.listen(8888);
  const set = new Set()

// function merge (socket, fileName) {
//
//   var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
//     videoFile = path.join(__dirname, 'uploads', fileName + '.webm'),
//     mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.webm')
//
//   new FFmpeg({
//     source: videoFile
//   })
//   .addInput(audioFile)
//   .addInput(audioFile)
//   .on('error', function (err) {
//     socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + err.message)
//     console.log(err)
//   })
//   .on('progress', function (progress) {
//     socket.emit('ffmpeg-output', Math.round(progress.percent))
//   })
//   .on('exit', function () {
//     console.log('some exit')
//   })
//   .on('end', function () {
//     // if (!set.has(fileName)) {
//     //   socket.emit('merged', fileName + '-merged.webm')
//     //   console.log('Merging finished !')
//     //   set.add(fileName)
//     // }
//
//     // removing audio/video files
//     fs.unlink(audioFile)
//     fs.unlink(videoFile)
//   })
//   .saveToFile(mergedFile)
//   // .writeToStream(fs.createWriteStream(mergedFile))
// }
}

module.exports = server
