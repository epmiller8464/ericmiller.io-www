'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config()
const {describe, it, before} = require('mocha')
const moment = require('moment')
const assert = require('assert')
const should = require('should')
const faker = require('faker')
const uuid = require('uuid')
// const crypto = require('crypto').Hmac
// const {level} = require('../level')('vm', {valueEncoding: 'json'})

const {VoiceMessage, ChatLog} = require('../lib/model')
let {createChannel, findChannel} = require('../lib/channel')
describe('db', () => {
  before('', (d) => {
    require('../lib/db')(() => {
      d()
    })
  })
  it('chat', (done) => {
    let person = faker.internet.email()
    let vm = new ChatLog({
      creator: person,
      channel: `${person} Room`,
      messages: [{
        from: faker.internet.email(),
        to: 'me',
        text: faker.lorem.sentence()
      }]
    })

    vm.save((err, doc) => {
      should.not.exist(err)
      should.exist(doc)
      console.log(doc.toObject())
      vm.messages.push(...[{
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
      }])

      vm.save((err, doc) => {
        should.not.exist(err)
        should.exist(doc)
        // vm.remove(() => {

        done()
        // })
      })
    })
  })

  it('createChannel', (done) => {
    let person = faker.internet.email()
    let channel = createChannel('hi', 'epm')

    channel.then((doc) => {
      should.exist(doc)
      console.log(doc)
      findChannel('hi').then((c) => {
        should(c).deepEqual(doc)
        done()
      })
    })
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