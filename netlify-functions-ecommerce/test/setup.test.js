'use strict';

const { after } = require('mocha');
const connect = require('../connect');
const mongoose = require('mongoose');

before(async function() {
  this.timeout(10000);
  await connect();
  await mongoose.connection.dropDatabase();

  await mongoose.model('Order').init();
});

after(async function() {
  await mongoose.disconnect();
});
