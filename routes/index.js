var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
const url = require('url')
/* GET home page. */
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'})
})

router.get('/voice-mail', function (req, res, next) {
  res.render('voice-mail', {title: 'Express'})
})
router.use('/uploads', (req, response, next) => {
  let uri = url.parse(req.url).pathname
  let filename = path.join(process.cwd() + '/uploads', uri)

  fs.readFile(filename, 'binary', function (err, file) {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      response.write(err + '\n')
      response.end()
      return
    }

    response.writeHead(200)
    response.write(file, 'binary')
    response.end()
  })
})
module.exports = router
