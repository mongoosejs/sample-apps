'use strict';

const config = require('./.config');
const mongoose = require('./mongoose');
const { createStargateUri } = require('stargate-mongoose');

let conn = null;

module.exports = async function connect() {
  if (conn != null) {
    return conn;
  }
  conn = mongoose.connection;

  let uri = config.astraUri;

  if (!uri) {
    uri = await createStargateUri(
      config.stargateBaseUrl,
      config.stargateAuthUrl,
      'test',
      config.stargateUsername,
      config.stargatePassword
    );
  }

  await mongoose.connect(uri, {
    autoCreate: false,
    autoIndex: false
  });
  return conn;
};
