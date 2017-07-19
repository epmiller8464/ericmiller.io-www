'use strict'
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const {VoiceMessage} = require('./model')

function updateAndRemoveFile (filename, id, response, cb) {
  filename = filename.search('uploads') >= 0 ? filename : path.join(process.env.PWD, '/uploads/', filename)

  deleteFileOnDisk(filename, (err, result) => {

    VoiceMessage.findByIdAndUpdate(id, {
      location: response.Location,
      filename: response.key,
      isTemp: false,
      meta: response
    }, {new: true}, (err, vm) => {
      if (err) {
        return cb(err)
      }

      return cb(err, vm.toObject())
    })
  })
}

function writeToDisk (audio, fileName, cb) {
  let dataURL = audio.dataURL
  let fileExtension = fileName.split('.').pop()
  let fileRootNameWithBase = './uploads/' + fileName
  let filePath = fileRootNameWithBase
  let fileID = 2

  // @todo return the new filename to client
  while (fs.existsSync(filePath)) {
    filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension
    fileID += 1
  }

  dataURL = dataURL.split(',').pop()
  // fileBuffer = new Buffer(dataURL, 'base64')
  // fs.writeFileSync(filePath, fileBuffer)
  let ws = fs.createWriteStream(filePath, 'base64').write(Buffer.from(dataURL, 'base64'))
  // console.log('filePath', filePath)
  // let key = buildKeyName(audio.email)
  // console.log(`key: ${key} path: ${filePath}`)
  let vm = new VoiceMessage({
    fromEmail: audio.email,
    image: audio.image,
    read: false,
    waveForm: audio.waveForm,
    location: filePath,
    filename: filePath
  })
  vm.save((err, doc) => {

    return cb(err, doc.toObject())
  })
}

function deleteFileOnDisk (fileName, cb) {
  fs.unlink(fileName.search('./uploads') >= 0 ? fileName : `./uploads/${fileName}`, (err) => {
    if (err) {
      return cb(err)
    }
    console.log(`successfully deleted ${fileName}`)
    return cb(null, true)
  })
}

module.exports = {writeToDisk, updateAndRemoveFile}