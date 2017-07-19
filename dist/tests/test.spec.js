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
// const {level} = require('../level')('vm', {valueEncoding: 'json'})

var _require2 = require('../lib/model'),
    VoiceMessage = _require2.VoiceMessage;

describe('db', function () {
  before('', function (d) {
    require('../lib/db')(function () {
      d();
    });
  });
  it('voice-message', function (done) {
    var vm = new VoiceMessage({
      createDate: moment().format('LL LTS'),
      fromEmail: 'epmiller8464@gamil.com'
    });

    vm.save(function (err, doc) {
      should.not.exist(err);
      should.exist(doc);
    });
    done();
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