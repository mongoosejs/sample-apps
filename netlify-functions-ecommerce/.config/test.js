'use strict';

const assert = require('assert');

const astraUri = process.env.ASTRA_URI;

if (!astraUri) {
  assert.ok(process.env.STARGATE_BASE_URL, 'Must set STARGATE_BASE_URL environment variable');
  assert.ok(process.env.STARGATE_AUTH_URL, 'Must set STARGATE_AUTH_URL environment variable');
  assert.ok(process.env.STARGATE_USERNAME, 'Must set STARGATE_BASE_URL environment variable');
  assert.ok(process.env.STARGATE_PASSWORD, 'Must set STARGATE_BASE_URL environment variable');
}

module.exports = Object.freeze({
  stargateBaseUrl: process.env.STARGATE_BASE_URL,
  stargateAuthUrl: process.env.STARGATE_AUTH_URL,
  stargateUsername: process.env.STARGATE_USERNAME,
  stargatePassword: process.env.STARGATE_PASSWORD,
  astraUri: process.env.ASTRA_URI,
  stripeSecretKey: 'test',
  stripeSuccessUrl: 'localhost:3000/success',
  stripeCancelUrl: 'localhost:3000/cancel'
});