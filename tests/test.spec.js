'use strict'
const {describe, it, before} = require('mocha')
const moment = require('moment')
const assert = require('assert')
const should = require('should')
const {level} = require('../level')('vm', {valueEncoding: 'json'})
describe('levelup', () => {
  it('put', (done) => {
    level.put('key', {test: 'ing'}, (err, result) => {
      should.not.exist(err)
      should.exist(result)
      done()
    })
  })
  it('get', (done) => {
    level.put('key', {test: 'ing'}, (err, result) => {
      should.not.exist(err)
      should.exist(result)
      level.get('key', (err, result) => {

        should.not.exist(err)
        should.exist(result)
        should(result.test).equal('ing')
        console.log(result)
        done()
      })
    })

  })
  it('delete', (done) => {
    level.put('key', {test: 'ing'}, (err, result) => {
      should.not.exist(err)
      should.exist(result)
      level.del('key', (err, result) => {
        should.not.exist(err)
        should.exist(result)
        done()
      })
    })

  })
})