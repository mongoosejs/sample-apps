'use strict';

const config = require('./.config');
const mongoose = require('./mongoose');
import { createStargateUri } from 'stargate-mongoose/dist/collections/utils';

let conn = null;

module.exports = async function connect() {
  if (conn != null) {
    return conn;
  }
  conn = mongoose.connection;

  const stargateUri = await createStargateUri(
    config.stargateBaseUrl,
    config.stargateAuthUrl,
    'test',
    config.stargateUsername,
    config.stargatePassword
  );

  await mongoose.connect(stargateUri, {
    autoCreate: false,
    autoIndex: false
  });
  return conn;
};
