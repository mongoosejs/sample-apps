'use strict';

const config = require('./.config');
const mongoose = require('./mongoose');

require('./models');

let conn = null;

module.exports = async function connect() {
  if (conn != null) {
    return conn;
  }
  conn = mongoose.connection;

  let uri = config.astraUri;

  await mongoose.connect(uri, {
    autoCreate: true,
    autoIndex: false,
    username: config.astraUsername,
    password: config.astraPassword,
    authUrl: 'http://localhost:8081/v1/auth'
  });
  await Promise.all(Object.values(mongoose.connection.models).map(Model => Model.init()));
  return conn;
};
