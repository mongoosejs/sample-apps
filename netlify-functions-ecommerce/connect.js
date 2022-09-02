'use strict';

const config = require('./.config');
const mongoose = require('./mongoose');
const { collections } = require('stargate-mongoose');

const stargateUri = collections.createAstraUri(
  process.env.STARGATE_BASE_URL,
  process.env.STARGATE_AUTH_URL,
  'test',
  process.env.STARGATE_USERNAME,
  process.env.STARGATE_PASSWORD
)

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
