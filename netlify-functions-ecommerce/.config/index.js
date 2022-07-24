'use strict';

if (process.env.NODE_ENV) {
  module.exports = require('./' + process.env.NODE_ENV);
  console.log('Using ' + process.env.NODE_ENV);
} else {
  console.log('using production');
  module.exports = require('./production');
}