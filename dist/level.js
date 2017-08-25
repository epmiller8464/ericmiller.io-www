'use strict';

module.exports = function (name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var db = require('./db')(name, options);
  var encoding = { valueEncoding: options.encoding || 'json' };
  var level = {
    put: function put(key, value, cb) {
      db.put(key, value, encoding, function (err) {

        if (err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, true);
      });
    },
    get: function get(key, cb) {
      db.get(key, encoding, function (err, value) {

        if (err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, value);
      });
    },
    del: function del(key, cb) {
      db.del(key, function (err) {

        if (err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, true);
      });
    },
    createReadStream: function createReadStream(_ref) {
      var keys = _ref.keys,
          values = _ref.values;

      return db.createReadStream({ keys: keys, values: values });
    }
  };
  return { level: level };
};
//# sourceMappingURL=level.js.map