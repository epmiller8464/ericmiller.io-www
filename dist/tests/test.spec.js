'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config();

var _require = require('mocha'),
    describe = _require.describe,
    it = _require.it,
    before = _require.before;

var moment = require('moment');
var assert = require('assert');
var should = require('should');
var faker = require('faker');
var uuid = require('uuid');
// const crypto = require('crypto').Hmac
// const {level} = require('../level')('vm', {valueEncoding: 'json'})

var _require2 = require('../lib/model'),
    VoiceMessage = _require2.VoiceMessage,
    ChatLog = _require2.ChatLog;

var _require3 = require('../lib/channel'),
    createChannel = _require3.createChannel,
    findChannel = _require3.findChannel;

describe('db', function () {
  before('', function (d) {
    require('../lib/db')(function () {
      d();
    });
  });
  it('chat', function (done) {
    var person = faker.internet.email();
    var vm = new ChatLog({
      creator: person,
      channel: person + ' Room',
      messages: [{
        from: faker.internet.email(),
        to: 'me',
        text: faker.lorem.sentence()
      }]
    });

    vm.save(function (err, doc) {
      var _vm$messages;

      should.not.exist(err);
      should.exist(doc);
      console.log(doc.toObject());
      (_vm$messages = vm.messages).push.apply(_vm$messages, [{
        from: person,
        to: 'epmiller8464@gmail.com',
        text: faker.lorem.sentence()
      }, {
        from: 'epmiller8464@gmail.com',
        to: person,
        text: faker.lorem.sentence()
      }, {
        from: person,
        to: 'epmiller8464@gmail.com',
        text: faker.lorem.sentence()
      }]);

      vm.save(function (err, doc) {
        should.not.exist(err);
        should.exist(doc);
        // vm.remove(() => {

        done();
        // })
      });
    });
  });

  it('createChannel', function (done) {
    var person = faker.internet.email();
    var channel = createChannel('hi', 'epm');

    channel.then(function (doc) {
      should.exist(doc);
      console.log(doc);
      findChannel('hi').then(function (c) {
        should(c).deepEqual(doc);
        done();
      });
    });
  });
  // it('put', (done) => {
  //   level.put('key', {test: 'ing'}, (err, result) => {
  //     should.not.exist(err)
  //     should.exist(result)
  //     done()
  //   })
  // })
  // it('get', (done) => {
  //   level.put('key', {test: 'ing'}, (err, result) => {
  //     should.not.exist(err)
  //     should.exist(result)
  //     level.get('key', (err, result) => {
  //
  //       should.not.exist(err)
  //       should.exist(result)
  //       should(result.test).equal('ing')
  //       console.log(result)
  //       done()
  //     })
  //   })
  //
  // })
  // it('delete', (done) => {
  //   level.put('key', {test: 'ing'}, (err, result) => {
  //     should.not.exist(err)
  //     should.exist(result)
  //     level.del('key', (err, result) => {
  //       should.not.exist(err)
  //       should.exist(result)
  //       done()
  //     })
  //   })
  //
  // })
});
//# sourceMappingURL=test.spec.js.map