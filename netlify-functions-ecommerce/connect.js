'use strict';

const config = require('./.config');
const mongoose = require('./mongoose');
const { collections } = require('stargate-mongoose');

let conn = null;

module.exports = async function connect() {
  if (conn != null) {
    return conn;
  }
  conn = mongoose.connection;

  const stargateUri = await collections.createStargateUri(
    config.stargateBaseUrl,
    config.stargateAuthUrl,
    'test',
    config.stargateUsername,
    config.stargatePassword
  );

  console.log('Connect to', stargateUri);
  await mongoose.connect(stargateUri);
  return conn;
};
