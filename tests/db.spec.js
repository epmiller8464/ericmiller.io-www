'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config()
const {describe, it, before} = require('mocha')
const moment = require('moment')
const assert = require('assert')
const should = require('should')
const faker = require('faker')
const uuid = require('uuid')
let MEM_STORE = require('../lib/data-store/memory-store')('vm.db')
let TEST_DB = require('../lib/data-store/memory-store')('test.db')

describe('db', () => {
  // before('', (d) => {
  //
  // })

  it('crud', (done) => {

    dbTest(MEM_STORE, () => {
      dbTest(TEST_DB, done)
    })
  })
})

function dbTest (instance, next) {
  let key = 'some key'
  instance.put(key, {test: 'ing'}, (err, success) => {
    should.not.exist(err)
    should.exist(success)
    should(success).equal(true)
    instance.get(key, (err, obj) => {
      should.not.exist(err)
      should.exist(obj)
      should(obj.test).equal('ing')
      next()
    })
  })

}