'use strict';

var Botkit = require('botkit').core;
var readline = require('readline');

function IoBot(configuration) {

  // Create a core botkit bot
  var io_bot = Botkit(configuration || {});
  var bots = {};
  io_bot.utterances = {
    yes: new RegExp(/^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah)/i),
    no: new RegExp(/^(no|nah|nope|n)/i),
    quit: new RegExp(/^(quit|cancel|end|stop|done|exit|nevermind|never mind)/i)
  };
  // io_bot.middleware.spawn.use(function (bot, next) {
  //   // console.log()
  //   if(bots[bot.config.channel]){
  //     return bots[bot.config.channel]
  //   }
  //   io_bot.listen(bot)
  //   next()
  // })
  io_bot.middleware.spawn.use(function (bot, next) {
    // console.log()
    // if (bots[bot.config.channel]) {
    //   bot = bots[bot.config.channel]
    // next()
    // } else {
    //   bots[bot.config.channel] = bot
    io_bot.listen(bot);
    // }
    next();
  });
  io_bot.middleware.format.use(function (bot, message, platform_message, next) {
    // clone the incoming message
    // Object.assign(platform_message, message)
    for (var k in message) {
      platform_message[k] = message[k];
    }
    next();
  });

  io_bot.defineBot(function (botkit, config) {

    var bot = {
      botkit: botkit,
      config: config || {},
      utterances: botkit.utterances,
      socket: config.socket
    };

    bot.createConversation = function (message, cb) {
      botkit.createConversation(this, message, cb);
    };

    bot.startConversation = function (message, cb) {
      botkit.startConversation(this, message, cb);
    };

    bot.send = function (message, cb) {
      console.log('BOT:', message.text);
      // bot.socket.emit('bot:message', message.text)
      // bot.socket.broadcast.emit('bot:message', message.text)
      // bot.socket.to(message.id).emit('bot:message', message)
      bot.socket.to(bot.config.channel).emit('bot:message', message);
      if (cb) {
        cb();
      }
    };

    bot.reply = function (src, resp, cb) {
      var msg = {};

      if (typeof resp == 'string') {
        msg.text = resp;
      } else {
        msg = resp;
      }

      msg.channel = src.channel;

      bot.say(msg, cb);
    };

    bot.findConversation = function (message, cb) {
      botkit.debug('CUSTOM FIND CONVO', message.user, message.channel);
      for (var t = 0; t < botkit.tasks.length; t++) {
        for (var c = 0; c < botkit.tasks[t].convos.length; c++) {
          if (botkit.tasks[t].convos[c].isActive() && botkit.tasks[t].convos[c].source_message.user === message.user) {
            botkit.debug('FOUND EXISTING CONVO!');
            cb(botkit.tasks[t].convos[c]);
            return;
          }
        }
      }

      cb();
    };
    return bot;
  });

  io_bot.listen = function (bot) {

    io_bot.startTicking();
    var io = bot.config.io;
    var nsp = io.of('/' + bot.config.channel);
    bot.socket = nsp;
    nsp.on('connection', function (socket) {
      // pino.info('new connection in room: %s ', room.channel)
      // bot.socket = socket
      socket.join(bot.config.channel);

      io_bot.trigger('say:greeting', [bot, {
        text: '',
        user: socket.id || 'Anonymous',
        id: socket.id,
        from: 'MEBOT',
        channel: 'text',
        timestamp: Date.now()
      }]);

      socket.on('bot:message', function (data) {

        var message = {
          text: data.text,
          user: socket.id || 'Anonymous',
          id: socket.id,
          from: 'MEBOT',
          channel: 'text',
          timestamp: Date.now()
        };
        io_bot.ingest(bot, message, null);
        // controller.trigger('socket:message_received', [bot, payload])
      });
    });

    // bot.socket.on('connection', (data) => {
    //   if (data) {
    //     //emit bot introduction and default message
    //   }
    // })

    // let rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false})
    // rl.on('line', function (line) {
    //   let message = {
    //     text: line,
    //     user: 'user',
    //     channel: 'text',
    //     timestamp: Date.now()
    //   }
    //
    //   io_bot.ingest(bot, message, null)
    //
    // })
  };

  return io_bot;
}

module.exports = IoBot;
//# sourceMappingURL=io_bot.js.map