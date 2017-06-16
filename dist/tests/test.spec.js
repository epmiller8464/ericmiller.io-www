'use strict';

var _require = require('mocha'),
    describe = _require.describe,
    it = _require.it,
    before = _require.before;

var moment = require('moment');
var assert = require('assert');
var should = require('should');

var _require2 = require('../level')('vm', { valueEncoding: 'json' }),
    level = _require2.level;

describe('levelup', function () {
  it('put', function (done) {
    level.put('key', { test: 'ing' }, function (err, result) {
      should.not.exist(err);
      should.exist(result);
      done();
    });
  });
  it('get', function (done) {
    level.put('key', { test: 'ing' }, function (err, result) {
      should.not.exist(err);
      should.exist(result);
      level.get('key', function (err, result) {

        should.not.exist(err);
        should.exist(result);
        should(result.test).equal('ing');
        console.log(result);
        done();
      });
    });
  });
  it('delete', function (done) {
    level.put('key', { test: 'ing' }, function (err, result) {
      should.not.exist(err);
      should.exist(result);
      level.del('key', function (err, result) {
        should.not.exist(err);
        should.exist(result);
        done();
      });
    });
  });
});
//# sourceMappingURL=test.spec.js.map