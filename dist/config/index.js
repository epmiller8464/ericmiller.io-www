'use strict';

var path = require('path');
var _ = require('lodash');
var url = require('url');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  host: process.env.NODE_HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  cs: '801f4985-5d23-4da6-afc3-9040167c5c5a',
  site_url: 'https://www.ericmiller.io/'
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});
//# sourceMappingURL=index.js.map