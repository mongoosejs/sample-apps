'use strict';

require('dotenv').config({ path: '.env.test' });

const { after } = require('mocha');
const mongoose = require('mongoose');

before(async() => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('Connected to', process.env.MONGODB_CONNECTION_STRING);
  await mongoose.connection.dropDatabase();
});

after(async function() {
  await mongoose.disconnect();
});
