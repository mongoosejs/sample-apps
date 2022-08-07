import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

mongoose.set('autoCreate', false);
mongoose.set('autoIndex', false);

import { driver } from 'stargate-mongoose';
mongoose.setDriver(driver);

const env = process.env.NODE_ENV;

if (env) {
  dotenv.config({
    path: path.resolve(path.join(__dirname, '..', '..'), `.env.${env.toLowerCase()}`),
  });
} else {
  dotenv.config();
}

if (process.env.ASTRA_URI == null) {
  throw new Error('Must set ASTRA_URI environment variable');
}

export default async function connect() {
  await mongoose.connect(process.env.ASTRA_URI);
}


