'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config()
const {describe, it, before} = require('mocha')
const moment = require('moment')
const assert = require('assert')
const should = require('should')
// const {level} = require('../level')('vm', {valueEncoding: 'json'})

const {VoiceMessage} = require('../lib/model')
describe('db', () => {
  before('', (d) => {
    require('../lib/db')(() => {
      d()
    })
  })
  it('voice-message', (done) => {
    let vm = new VoiceMessage({
      createDate: moment().format('LL LTS'),
      fromEmail: 'epmiller8464@gamil.com',
    })

    vm.save((err, doc) => {
      should.not.exist(err)
      should.exist(doc)
    })
    done()
  })
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
})