'use strict'
const uuid = require('node-uuid')
const fs = require('fs')
function server (app) {
  var path = require('path'),
    exec = require('child_process').exec

  var io = require('socket.io').listen(app)

  io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
      var fileName = uuid.v4()

      socket.emit('ffmpeg-output', 0)

      writeToDisk(data.audio.dataURL, fileName + '.wav')

      // if it is chrome
      if (data.video) {
        writeToDisk(data.video.dataURL, fileName + '.webm')
        merge(socket, fileName)
      }

      // if it is firefox or if user is recording only audio
      else socket.emit('merged', fileName + '.wav')
    })
  })

// isn't it redundant?
// app.listen(8888);

  function writeToDisk (dataURL, fileName) {
    var fileExtension = fileName.split('.').pop(),
      fileRootNameWithBase = './uploads/' + fileName,
      filePath = fileRootNameWithBase,
      fileID = 2,
      fileBuffer

    // @todo return the new filename to client
    while (fs.existsSync(filePath)) {
      filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension
      fileID += 1
    }

    dataURL = dataURL.split(',').pop()
    fileBuffer = new Buffer(dataURL, 'base64')
    fs.writeFileSync(filePath, fileBuffer)

    console.log('filePath', filePath)
  }

  function merge (socket, fileName) {
    var FFmpeg = require('fluent-ffmpeg')

    var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
      videoFile = path.join(__dirname, 'uploads', fileName + '.webm'),
      mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.webm')

    new FFmpeg({
      source: videoFile
    })
    .addInput(audioFile)
    .on('error', function (err) {
      socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + err.message)
    })
    .on('progress', function (progress) {
      socket.emit('ffmpeg-output', Math.round(progress.percent))
    })
    .on('end', function () {
      socket.emit('merged', fileName + '-merged.webm')
      console.log('Merging finished !')

      // removing audio/video files
      fs.unlink(audioFile)
      fs.unlink(videoFile)
    })
    .saveToFile(mergedFile)
  }
}

module.exports = server