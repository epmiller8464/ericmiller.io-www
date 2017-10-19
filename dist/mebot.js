'use strict';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Console bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Run your bot from the command line:

    node console_bot.js

# USE THE BOT:

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// var Botkit = require('botkit')
var os = require('os');
var IOBOT = require('./lib/bot/io_bot');

module.exports = function (io) {

  // var controller = Botkit.consolebot({
  var controller = IOBOT({
    debug: true,
    socket: io
  });

  controller.on('say:greeting', function (bot, message) {

    bot.startConversation(message, function (err, convo) {
      if (!err) {
        convo.say('Hi, my name is Mebot, I was built to answer some questions you might have about Eric.<br/>' + 'I can send you his resume. if you say things like "resume".<br/>' + 'I can tell you about "Eric". if you say things like "info, bio, who is eric, or tell me about eric".<br/>' + 'I can tell you about "Me". if you say things like "who are you","who","identify yourself".<br/>' + 'I can learn your name. if you say "call me (insert your name).".<br/>' + 'I can tell you who i am have a chatting with. if you say "who am i" or "what is my name".<br/>' + 'I can tell you how old I am. if you say "uptime".<br/>' + 'Be patient, I am still learning so be nice.');
      }
    });
  });

  controller.hears(['hello', 'hi'], 'message_received', function (bot, message) {

    controller.storage.users.get(message.user, function (err, user) {
      if (user && user.name) {
        bot.reply(message, 'Hello ' + user.name + '!!');
      } else {
        bot.reply(message, 'Hello.');
      }
    });
  });

  controller.hears(['help', 'can you'], 'message_received', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      if (!err) {
        // convo.say('I do not know your name yet!')
        convo.ask('Do you need help?', [{
          pattern: bot.utterances.yes,
          callback: function callback(response, convo) {
            convo.say('Ok got it.');
            convo.say('I can send you my resume. if you say things like "resume".');
            convo.say('I can tell you about "Eric". if you say things like "info, bio, who is eric, or tell me about eric".');
            convo.say('I can tell you about "MeBot". if you say things like "who are you","who","identify yourself".');

            convo.next();
          }
        }, {
          pattern: bot.utterances.no,
          default: true,
          callback: function callback(response, convo) {
            convo.say('Ok...');
            convo.next();
          }
        }]);

        // convo.on('end', function (convo) {
        //   if (convo.status == 'completed') {
        //     bot.reply(message, 'OK! I will update my dossier...')
        //
        //     controller.storage.users.get(message.user, function (err, user) {
        //       if (!user) {
        //         user = {
        //           id: message.user,
        //         }
        //       }
        //       user.name = convo.extractResponse('nickname')
        //       controller.storage.users.save(user, function (err, id) {
        //         bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.')
        //       })
        //     })
        //
        //   } else {
        //     // this happens if the conversation ended prematurely for some reason
        //     bot.reply(message, 'OK, nevermind!')
        //   }
        // })
      }
    });
  });
  controller.hears(['bio', 'who is eric', 'tell me about'], 'message_received', function (bot, message) {

    bot.reply(message, 'Just a man who likes to build software, eat, and you.');
  });
  controller.hears(['resume', 'work info'], 'message_received', function (bot, message) {

    bot.reply(message, 'Sorry still updating my resume.');
  });
  controller.hears(['work', 'available', 'job', 'opportunity'], 'message_received', function (bot, message) {

    controller.storage.users.get(message.user, function (err, user) {
      if (user && user.name) {
        bot.startConversation(message, function (err, convo) {
          if (!err) {
            convo.say('I do not know your name yet!');
            convo.ask('What should I call you?', function (response, convo) {
              convo.ask('You want me to call you `' + response.text + '`?', [{
                pattern: 'yes',
                callback: function callback(response, convo) {
                  // since no further messages are queued after this,
                  // the conversation will end naturally with status == 'completed'
                  convo.next();
                }
              }, {
                pattern: 'no',
                callback: function callback(response, convo) {
                  // stop the conversation. this will cause it to end with status == 'stopped'
                  convo.stop();
                }
              }, {
                default: true,
                callback: function callback(response, convo) {
                  convo.repeat();
                  convo.next();
                }
              }]);

              convo.next();
            }, { 'key': 'nickname' }); // store the results in a field called nickname

            convo.on('end', function (convo) {
              if (convo.status == 'completed') {
                bot.reply(message, 'OK! I will update my dossier...');

                controller.storage.users.get(message.user, function (err, user) {
                  if (!user) {
                    user = {
                      id: message.user
                    };
                  }
                  user.name = convo.extractResponse('nickname');
                  controller.storage.users.save(user, function (err, id) {
                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                  });
                });
              } else {
                // this happens if the conversation ended prematurely for some reason
                bot.reply(message, 'OK, nevermind!');
              }
            });
          }
        });
      } else {
        bot.reply(message, 'Sorry I don\'t know how to answer that.');
      }
    });
  });

  controller.hears(['call me (.*)', 'my name is (.*)'], 'message_received', function (bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function (err, user) {
      if (!user) {
        user = {
          id: message.user
        };
      }
      user.name = name;
      controller.storage.users.save(user, function (err, id) {
        bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
      });
    });
  });

  controller.hears(['what is my name', 'who am i'], 'message_received', function (bot, message) {

    controller.storage.users.get(message.user, function (err, user) {
      if (user && user.name) {
        bot.reply(message, 'Your name is ' + user.name);
      } else {
        bot.startConversation(message, function (err, convo) {
          if (!err) {
            convo.say('I do not know your name yet!');
            convo.ask('What should I call you?', function (response, convo) {
              convo.ask('You want me to call you `' + response.text + '`?', [{
                pattern: 'yes',
                callback: function callback(response, convo) {
                  // since no further messages are queued after this,
                  // the conversation will end naturally with status == 'completed'
                  convo.next();
                }
              }, {
                pattern: 'no',
                callback: function callback(response, convo) {
                  // stop the conversation. this will cause it to end with status == 'stopped'
                  convo.stop();
                }
              }, {
                default: true,
                callback: function callback(response, convo) {
                  convo.repeat();
                  convo.next();
                }
              }]);

              convo.next();
            }, { 'key': 'nickname' }); // store the results in a field called nickname

            convo.on('end', function (convo) {
              if (convo.status == 'completed') {
                bot.reply(message, 'OK! I will update my dossier...');

                controller.storage.users.get(message.user, function (err, user) {
                  if (!user) {
                    user = {
                      id: message.user
                    };
                  }
                  user.name = convo.extractResponse('nickname');
                  controller.storage.users.save(user, function (err, id) {
                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                  });
                });
              } else {
                // this happens if the conversation ended prematurely for some reason
                bot.reply(message, 'OK, nevermind!');
              }
            });
          }
        });
      }
    });
  });

  controller.hears(['shutdown'], 'message_received', function (bot, message) {

    bot.startConversation(message, function (err, convo) {

      convo.ask('Are you sure you want me to shutdown?', [{
        pattern: bot.utterances.yes,
        callback: function callback(response, convo) {
          convo.say('Bye!');
          convo.next();
          setTimeout(function () {
            process.exit();
          }, 3000);
        }
      }, {
        pattern: bot.utterances.no,
        default: true,
        callback: function callback(response, convo) {
          convo.say('*Phew!*');
          convo.next();
        }
      }]);
    });
  });

  controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'message_received', function (bot, message) {

    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());

    bot.reply(message, ':robot_face: I am MeBot. I have been alive for ' + uptime + ' born on ' + hostname + '.');
  });

  function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'minute';
    }
    if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'hour';
    }
    if (uptime != 1) {
      unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
  }

  return controller;
};
//# sourceMappingURL=mebot.js.map