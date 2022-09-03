'use strict';

const { after } = require('mocha');
const connect = require('../connect');
const mongoose = require('../mongoose');

before(async function() {
  this.timeout(30_000);
  await connect();

  // Create namespace, otherwise get "Unknown namespace test, you must create it first"
  await mongoose.connection.client.httpClient.post('/v2/schemas/namespaces', {
    name: 'test'
  });

  await Promise.all(Object.values(mongoose.connection.models).map(Model => Model.createCollection()));
  await Promise.all(Object.values(mongoose.connection.models).map(Model => Model.deleteMany({})));
});

after(async function() {
  this.timeout(30_000);
  await Promise.all(Object.values(mongoose.connection.models).map(async Model => {
    await mongoose.connection.dropCollection(Model.collection.collectionName);
  }));

  await mongoose.disconnect();
});
