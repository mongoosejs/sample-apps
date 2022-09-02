'use strict';

const config = require('./.config');
const mongoose = require('./mongoose');
const { collections } = require('stargate-mongoose');

const stargateUri = collections.createAstraUri(
  config.stargateBaseUrl,
  config.stargateAuthUrl,
  'test',
  config.stargateUsername,
  config.stargatePassword
);

let conn = null;

module.exports = async function connect() {
  if (conn != null) {
    return conn;
  }
  conn = mongoose.connection;

  console.log('Connect to', stargateUri);
  await mongoose.connect(stargateUri);
  return conn;
};
