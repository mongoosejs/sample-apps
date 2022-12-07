import mongoose from './mongoose';
import { createStargateUri } from 'stargate-mongoose';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV;
//console.log('env : ' + env);
if (env) {
  dotenv.config({
    path: path.resolve(path.join(__dirname, '..', '..'), `.env.${env.toLowerCase()}`)
  });
} else {
  dotenv.config();
}

export default async function connect() {
  let stargateUri = process.env.ASTRA_URI;
  if(!stargateUri){
    stargateUri = await createStargateUri(
      process.env.STARGATE_BASE_URL,
      process.env.STARGATE_AUTH_URL,
      'test',
      process.env.STARGATE_USERNAME,
      process.env.STARGATE_PASSWORD
    );
  }
  //console.log('Connecting to AstraDB : ' + stargateUri);
  await mongoose.connect(stargateUri);
}


