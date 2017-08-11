'use strict';

var uuid = require('uuid');

var _require = require('./lib/vmware'),
    writeToDisk = _require.writeToDisk,
    updateAndRemoveFile = _require.updateAndRemoveFile;

var _require2 = require('./lib/storageService'),
    Service = _require2.Service;
// const exec = require('child_process').exec
// const FFmpeg = require('fluent-ffmpeg')
// const {level} = require('./level')('vm', {valueEncoding: 'json'})


var _require3 = require('./lib/model'),
    VoiceMessage = _require3.VoiceMessage;

require('./lib/db')(function () {});

function server(app) {

  // var io = require('socket.io').listen(app)
  var opts = {
    transports: ['polling', 'xhr-polling', 'jsonp-polling'],
    log: true,
    origins: '*:*'
  }; // 'disconnect' EVENT will work only with 'websocket
  var io = require('socket.io')(app, opts);
  io.sockets.on('connection', function (socket) {

    socket.on('message', function (data) {
      var fileName = uuid.v4();

      socket.emit('ffmpeg-output', 0);
      // console.log(data)
      // console.log('my nigga we have the image %s', data.audio.image)
      writeToDisk(data.audio, fileName + '.wav', function (error, doc) {

        if (error) {
          socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + error.message);
          return;
        }
        var vm = doc;
        socket.emit('merged', { fileName: fileName + '.wav', id: vm._id, key: vm.filename });
      });
    });

    socket.on('save-upload', function (data) {

      var filename = data.filename;
      var id = data.id;
      Service.AWS.upload(filename, { id: id }, function (err, result) {
        console.log(err);
        console.log(result);

        updateAndRemoveFile(filename, id, result, function (err, vm) {
          socket.emit('uploaded', vm);
        });
      });
    });
  });

  // isn't it redundant?
  // app.listen(8888);
  var set = new Set();

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

module.exports = server;
//# sourceMappingURL=socket.io.js.map