'use strict';

var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var FFmpeg = require('fluent-ffmpeg');

function server(app, logger) {

  // var io = require('socket.io').listen(app)
  var opts = {
    transports: ['polling', 'websocket', 'xhr-polling', 'jsonp-polling'],
    log: false,
    origins: '*:*'
  }; // 'disconnect' EVENT will work only with 'websocket
  var io = require('socket.io')(app, opts);
  io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
      var fileName = uuid.v4();

      socket.emit('ffmpeg-output', 0);

      writeToDisk(data.audio.dataURL, fileName + '.wav');

      // if it is chrome
      if (data.video) {
        writeToDisk(data.video.dataURL, fileName + '.webm');
        merge(socket, fileName);
      }
      // if it is firefox or if user is recording only audio
      else {
          // socket.emit('merged', fileName + '.wav')
        }
    });
  });

  // isn't it redundant?
  // app.listen(8888);
  var set = new Set();

  function writeToDisk(dataURL, fileName) {
    var fileExtension = fileName.split('.').pop(),
        fileRootNameWithBase = './uploads/' + fileName,
        filePath = fileRootNameWithBase,
        fileID = 2,
        fileBuffer;

    // @todo return the new filename to client
    while (fs.existsSync(filePath)) {
      filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
      fileID += 1;
    }

    dataURL = dataURL.split(',').pop();
    fileBuffer = new Buffer(dataURL, 'base64');
    fs.writeFileSync(filePath, fileBuffer);

    console.log('filePath', filePath);
  }

  function merge(socket, fileName) {

    var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
        videoFile = path.join(__dirname, 'uploads', fileName + '.webm'),
        mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.webm');

    FFmpeg({
      source: videoFile
    }).addInput(audioFile).on('error', function (err) {
      socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + err.message);
      console.error(err);
    }).on('progress', function (progress) {
      socket.emit('ffmpeg-output', Math.round(progress.percent));
    }).on('end', function () {
      if (!set.has(fileName)) {
        socket.emit('merged', fileName + '-merged.webm');
        console.log('Merging finished !');
        set.add(fileName);
      }

      // removing audio/video files
      fs.unlink(audioFile);
      fs.unlink(videoFile);
    }).saveToFile(mergedFile);
  }
}

module.exports = server;
//# sourceMappingURL=socket.io.js.map