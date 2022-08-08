'use strict';

const { after } = require('mocha');
const connect = require('../connect');
const mongoose = require('mongoose');

before(async function() {
  this.timeout(10000);
  await connect();
  await Promise.all(Object.values(mongoose.connection.models).map(Model => Model.deleteMany({})));
});

after(async function() {
  await mongoose.disconnect();
});
