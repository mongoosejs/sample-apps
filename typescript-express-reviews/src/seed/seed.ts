import dotenv from 'dotenv';
dotenv.config();

import connect from '../models/connect';
import mongoose from 'mongoose';

import User from '../models/user';
import Authentication from '../models/authentication';
import Vehicle from '../models/vehicle';
import bcrypt from 'bcryptjs';

run().catch(err => {
  console.error(err);
  process.exit(-1);
});

async function run() {
  await connect();
  // First wait for autoCreate to finish
  await Promise.all(Object.values(mongoose.connection.models).map(async Model => {
    await Model.init();
  }));
  // Then drop all collections to clear db
  await Promise.all(Object.values(mongoose.connection.models).map(async Model => {
    await mongoose.connection.dropCollection(Model.collection.collectionName);
  }));
  // Then recreate all collections. Workaround for lack of `dropDatabase()` and `deleteMany()`
  await Promise.all(Object.values(mongoose.connection.models).map(async Model => {
    await mongoose.connection.createCollection(Model.collection.collectionName);
  }));

  const users = await User.create([
    {
      firstName: 'Dominic',
      lastName: 'Toretto',
      email: 'dom@fastandfurious.com'
    },
    {
      firstName: 'Brian',
      lastName: 'O\'Connor',
      email: 'brian@fastandfurious.com'
    }
  ]);
  for (let i = 0; i < users.length; i++) {
    await Authentication.create({
      type: 'password',
      userId: users[i]._id,
      secret: await bcrypt.hash(users[i].firstName.toLowerCase(), 10)
    });
  }
  await Vehicle.create([
    {
      _id: '0'.repeat(24),
      make: 'Tesla',
      model: 'Model S',
      year: 2022,
      images: [
        'https://tesla-cdn.thron.com/delivery/public/image/tesla/6139697c-9d6a-4579-837e-a9fc5df4a773/bvlatuR/std/1200x628/Model-3-Homepage-Social-LHD',
        'https://www.tesla.com/sites/default/files/images/blogs/models_blog_post.jpg'
      ],
      numReviews: 0,
      averageReviews: 0
    },
    {
      _id: '1'.repeat(24),
      make: 'Porsche',
      model: 'Taycan',
      year: 2022,
      images: [
        'https://www.motortrend.com/uploads/sites/5/2020/02/2020-Porsche-Taycan-Turbo-S-Track-Ride-5.gif?fit=around%7C875:492',
        'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2021/Products/Free-Software-Update-Taycan/Free-Software-Update-for-early-Porsche-Taycan_2.jpeg/jcr:content/Free%20Software-Update%20for%20early%20Porsche%20Taycan_2.jpeg'
      ],
      numReviews: 0,
      averageReviews: 0
    }
  ]);

  console.log('Done');
}
