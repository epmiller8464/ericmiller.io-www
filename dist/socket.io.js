'use strict';

var uuid = require('uuid');

var _require = require('./lib/vmware'),
    writeToDisk = _require.writeToDisk,
    updateAndRemoveFile = _require.updateAndRemoveFile;

var _require2 = require('./lib/storageService'),
    Service = _require2.Service;

var jwt = require('jsonwebtoken');
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
      // add token logic
      // data.token
      if (!data.audio.token) {
        socket.emit('ffmpeg-error', 'Cannot save unvalidated file must contain a valid and signed JWT.');
        return;
      }

      var sign = data.audio.token;
      console.log(sign);
      var validationResults = jwt.verify(sign.token, process.env.JWT_SIGNATURE, { jwtid: sign.jwtid }, function (err, payload) {

        if (err) {
          socket.emit('ffmpeg-error', 'Could not validate file signature.');
          return;
        }

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
}

module.exports = server;
//# sourceMappingURL=socket.io.js.map