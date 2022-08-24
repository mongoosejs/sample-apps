import { after, before, beforeEach } from 'mocha';
import connect from '../src/models/connect';
import mongoose from 'mongoose';

before(async function() {
  this.timeout(10000);

  await connect();

  // Make sure all collections are created in Stargate, _after_ calling
  // `connect()`. stargate-mongoose doesn't currently support buffering on
  // connection helpers.
  await Promise.all(Object.values(mongoose.models).map(Model => {
    return Model.createCollection();
  }));
});

beforeEach(async function clearDb() {
  this.timeout(10000);

  await Promise.all(Object.values(mongoose.models).map(Model => {
    return Model.deleteMany({});
  }));
});

after(async function() {
  await mongoose.disconnect();
});
