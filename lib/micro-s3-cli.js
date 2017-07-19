/**
 * Created by ghostmac on 7/14/17.
 */
const {Service} = require('./storageService')
const path = require('path')
const optimist = require('optimist')
let argv = optimist.argv

if (argv.file) {
  let file = path.join(process.env.PWD, '/uploads/', argv.file)
  console.log(file)
  console.log(path.parse(file))
  let parsedPath = path.parse(file)
  Service.AWS.upload(file, {metadata: file}, (err, result) => {
    console.log(err)
    console.log(result)
  })
} else if (argv.list) {
  Service.AWS.list((err, result) => {
    console.log(err)
    console.log(result)
  })
}
