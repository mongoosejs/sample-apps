import mongoose from 'mongoose';

if (process.env.MONGODB_CONNECTION_STRING == null) {
  throw new Error('Must set MONGODB_CONNECTION_STRING environment variable');
}

export default async function connect() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
};


