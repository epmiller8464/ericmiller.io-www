'use strict';

var uuid = require('uuid');

var _require = require('./lib/vmware'),
    writeToDisk = _require.writeToDisk,
    updateAndRemoveFile = _require.updateAndRemoveFile;

var _require2 = require('./lib/storageService'),
    Service = _require2.Service;

var jwt = require('jsonwebtoken');

var _require3 = require('./lib/model'),
    VoiceMessage = _require3.VoiceMessage;

var ch = require('./lib/callevent')();

var _require4 = require('./lib/channel'),
    createChannel = _require4.createChannel,
    findChannel = _require4.findChannel;

var pino = require('pino')();
var db = require('./lib/data-store/memory-store')('vm');
var room = require('./lib/room');
var user = require('./lib/user');

var noop = function noop() {};
var rooms = {};

var io = void 0;
var controller = void 0;

function server(app, notifier) {

  // var io = require('socket.io').listen(app)

  var opts = {
    transports: ['polling', 'websocket', 'xhr-polling', 'jsonp-polling'],
    log: true,
    origins: '*:*'
  }; // 'disconnect' EVENT will work only with 'websocket
  io = require('socket.io')(app, opts);
  controller = require('./lib/bot/mebot')({ io: io });

  io.sockets.on('connection', function (socket) {
    // var bot = controller.spawn({socket})
    var clientId = uuid.v4();
    // socket.id = clientId
    socket.on('message', function (data) {
      // add token logic
      // data.token
      if (!data.audio.token) {
        socket.emit('ffmpeg-error', 'Cannot save unvalidated file must contain a valid and signed JWT.');
        return;
      }

      var sign = data.audio.token;
      console.log(sign);
      jwt.verify(sign.token, process.env.JWT_SIGNATURE, { jwtid: sign.jwtid }, function (err, payload) {

        if (err) {
          socket.emit('ffmpeg-error', 'Could not validate file signature. ' + err.message);
          return;
        }

        var fileName = payload.jti;

        socket.emit('ffmpeg-output', 0);
        // console.log(data)
        // console.log('my nigga we have the image %s', data.audio.image)
        data.audio.email = payload.email;
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
    socket.on('bot:new-room', function (rid) {
      var nsp = io.of('/' + rid);
      var bot = controller.spawn({ socket: nsp, channel: rid });
    });
    // socket.on('bot', (data) => {
    //
    //   let payload = {
    //     text: data,
    //     user: data.user || socket.id,
    //     channel: 'text',
    //     timestamp: Date.now()
    //   }
    //
    //   // controller.trigger('socket:message_received', [bot, payload])
    //   controller.recievedMessage(payload)
    // })
    // controller.connect(socket)

    socket.on('disconnect', function () {

      //room.nsp.emit('leaving')
      //
    });
  });
  notifier.on('bot:create-room', function (rid) {

    var bot = controller.spawn({ io: io, channel: rid });
  });
}

function createRoom(data, cb) {

  cb = cb || noop;
  createChannel(data.channel, data.from);
  var room = new room({
    id: data.channel,
    channel: data.channel,
    peers: null,
    broadcaster: null,
    channelIsReady: false
  });

  saveRoom(room, function (err, room) {
    pino.info('room %s created', room.channel);
    var nsp = io.of('/' + data.channel);
    nsp.on('connection', function (socket) {
      pino.info('new connection in room: %s ', room.channel);

      socket.join(room.channel);

      socket.on('join-broadcast', function (data) {
        var user;
        getRoom(data.channel, function (err, r) {

          if (!r.peers) {
            r.peers = {};
          }

          if (r.peers[data.id]) {
            user = r.peers[data.id];
          } else {
            user = new user({
              id: socket.id,
              username: data.username,
              channel: data.channel
            });
          }

          if (!r.broadcaster) {
            r.broadcaster = user.id.toString();
            user.broadcaster = true;
          }
          r.peers[user.id] = user;

          if (user.broadcaster) {
            socket.emit('start-broadcasting');
          } else {
            //socket.emit('join-broadcast', user);
            nsp.to(r.broadcaster).emit('call-peer', user);
            nsp.to(user.id).emit('join-broadcast', { broadcaster: r.broadcaster });
          }
          saveRoom(r);
        });
      });

      socket.on('message', function (msg) {
        console.log('incoming msg %s', msg);
        if (msg.to) {
          nsp.to(msg.to).emit('message', msg);
        } else {
          socket.broadcast.emit('message', msg);
        }
      });
      socket.on('disconnect', function (e) {
        if (e) {
          console.log('opps RoomServer encountered an error: %s', e);
        }
      });

      socket.on('error', function (e) {

        if (e) {
          console.log('opps RoomServer encountered an error: %s', e);
        }
      });
    });
  });
}

function getRoom(roomId, cb) {
  cb = cb || noop;

  if (!roomId || roomId.toString().length == 0) cb(null, null);
  roomId = roomId.replace('/', '');
  db.get(roomId, function (err, r) {
    var room = r ? JSON.parse(r) : null;
    return cb(err, room);
  });
}

module.exports = server;
//# sourceMappingURL=socket.io.js.map