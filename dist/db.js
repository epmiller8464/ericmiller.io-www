'use strict';

var levelup = require('levelup');
var instance = void 0;
var instances = void 0;

function db(name) {

  instances = instances || {};
  instance = instances[name];
  if (instance) return instance;

  instance = levelup('./' + name);
  instance.on('ready', function () {
    console.log('levelup ready');
  }).on('closing', function () {
    console.log('closing db');
  });
  instances[name] = instance;
  return instance;
}

module.exports = db;
//# sourceMappingURL=db.js.map