import { after, before, beforeEach } from 'mocha';
import connect from '../src/models/connect';
import mongoose from 'mongoose';

before(async function() {
  await connect();
});

beforeEach(async function clearDb() {
  await Promise.all(Object.values(mongoose.models).map(Model => Model.deleteMany({})));
});

after(async function() {
  await mongoose.disconnect();
});
