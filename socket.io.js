'use strict'
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
// const exec = require('child_process').exec
// const FFmpeg = require('fluent-ffmpeg')
const {level} = require('./level')('vm', {valueEncoding: 'json'})

function server (app) {

  // var io = require('socket.io').listen(app)
  var opts = {
    transports: [
      'polling',
      'websocket',
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
      console.log('my nigga we have the image %s', data.audio.image)
      writeToDisk(data.audio, fileName + '.wav', (error, result) => {

        if (error) {
          socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + error.message)
          return
        }
        socket.emit('merged', fileName + '.wav')
      })
    })
  })

// isn't it redundant?
// app.listen(8888);
  const set = new Set()

  function writeToDisk (audio, fileName, cb) {
    let dataURL = audio.dataURL
    let fileExtension = fileName.split('.').pop()
    let fileRootNameWithBase = './uploads/' + fileName
    let filePath = fileRootNameWithBase
    let fileID = 2

    // @todo return the new filename to client
    while (fs.existsSync(filePath)) {
      filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension
      fileID += 1
    }

    dataURL = dataURL.split(',').pop()
    // fileBuffer = new Buffer(dataURL, 'base64')
    // fs.writeFileSync(filePath, fileBuffer)
    let ws = fs.createWriteStream(filePath, 'base64').write(Buffer.from(dataURL, 'base64'))
    console.log('filePath', filePath)
    let key = buildKeyName(audio.email)
    console.log(`key: ${key} path: ${filePath}`)
    level.put(key, {image: audio.image, audio_path: filePath, read: false, waveForm: audio.waveForm}, cb)
  }

  function buildKeyName (email) {
    return `${email}.${moment().valueOf()}`
  }

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