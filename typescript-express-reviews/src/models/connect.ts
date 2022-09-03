import mongoose from './mongoose';
import { collections } from 'stargate-mongoose';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV;

if (env) {
  dotenv.config({
    path: path.resolve(path.join(__dirname, '..', '..'), `.env.${env.toLowerCase()}`)
  });
} else {
  dotenv.config();
}

export default async function connect() {
  const stargateUri = await collections.createStargateUri(
    process.env.STARGATE_BASE_URL,
    process.env.STARGATE_AUTH_URL,
    'test',
    process.env.STARGATE_USERNAME,
    process.env.STARGATE_PASSWORD
  );

  await mongoose.connect(stargateUri);
}


