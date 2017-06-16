/*

 */

let levelup = require('levelup')
let instance
function db (name) {

  if (instance)
    return instance

  instance = levelup(`./${name}`)
  instance.on('ready', function () {
    console.log('levelup ready')
  })
  .on('closing', () => {
    console.log('closing db')
  })
  return instance
}
module.exports = db
