import mongoose from 'mongoose';
import studio from '@mongoosejs/studio/backend/next';

await mongoose.connect('mongodb://127.0.0.1:27017/mongoose_test');

const handler = studio();

export default handler;
