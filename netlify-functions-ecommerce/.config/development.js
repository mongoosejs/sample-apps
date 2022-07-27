'use strict';
  
const assert = require('assert');

assert.ok(process.env.ASTRA_URI, 'Must set ASTRA_URI environment variable');

module.exports = Object.freeze({
  astraUri: process.env.ASTRA_URI,
  stripeSecretKey: 'test',
  stripeSuccessUrl: 'localhost:3000/success',
  stripeCancelUrl: 'localhost:3000/cancel'
});

