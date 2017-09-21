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
var MEM_STORE = require('../lib/data-store/memory-store')('vm.db');
var TEST_DB = require('../lib/data-store/memory-store')('test.db');

describe('db', function () {
  // before('', (d) => {
  //
  // })

  it('crud', function (done) {

    dbTest(MEM_STORE, function () {
      dbTest(TEST_DB, done);
    });
  });
});

function dbTest(instance, next) {
  var key = 'some key';
  instance.put(key, { test: 'ing' }, function (err, success) {
    should.not.exist(err);
    should.exist(success);
    should(success).equal(true);
    instance.get(key, function (err, obj) {
      should.not.exist(err);
      should.exist(obj);
      should(obj.test).equal('ing');
      next();
    });
  });
}
//# sourceMappingURL=db.spec.js.map