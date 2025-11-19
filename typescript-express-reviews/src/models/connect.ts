import mongoose from 'mongoose';

const uri = process.env.MONGODB_CONNECTION_STRING || '';

export default async function connect() {
  await mongoose.connect(uri);
}
