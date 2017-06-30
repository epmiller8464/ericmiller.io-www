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

router.use('/uploads', (req, response, next) => {
  var uri = url.parse(req.url).pathname,
    filename = path.join(process.cwd() + '/uploads', uri)
  // var filename = `./../uploads${req.url}`
  // let ws = fs.createReadStream(filename, 'binary').write(Buffer.from(dataURL, 'binary'))

  fs.readFile(filename, 'binary', function (err, file) {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      response.write(err + '\n')
      response.end()
      return
    }
    console.log(file.length)
    response.writeHead(206, {
      // 'Content-Type': 'audio/wav',
      // 'Content-Type': 'application/octet-stream',
      // 'content-range': `bytes 0-1/${file.length}`,
      // 'content-range': `bytes 9750-${file.length - 9750}/${file.length}`,
      // 'content-length': `${file.length}`,
      // 'Accept-Range': `bytes`
      // 'Content-Length': `XX`
    })
    response.write(file, 'binary')
    response.end()
  })

})

module.exports = router
