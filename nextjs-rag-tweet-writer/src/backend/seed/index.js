const User = require('../models/User');
const Tweet = require('../models/Tweet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../../.env' });

run().catch(e => console.log(e));

async function run() {
  await mongoose.connect(process.env.CONNECTIONSTRING);
  const elon = await User.create({ name: 'Elon Musk'});
  const don = await User.create({ name: 'Donald Trump' });
  const joe = await User.create({ name: 'Joe Biden'});
  const jeff = await User.create({ name: 'Jeff Bezoz' });
  const bill = await User.create({ name: 'Bill Gates' });
  const steve = await User.create({ name: 'Steve Jobs' });


  await Tweet.create([
    {
      content: 'I like space',
      userId: elon._id
    },
    {
      content: 'I like Electric cars',
      userId: elon._id
    },
    {
      content: 'I like making posts on X',
      userId: elon._id
    }
  ]);

  await Tweet.create([
    {
      content: 'This has been the worst deal in the history of trade deals.',
      userId: don._id
    },
    {
      content: 'He\'s a great guy, smart guy, one of the best guys. Not as good as me though.',
      userId: don._id
    },
    {
      content: 'You\'re gonna be so sick of winning you\'re gonna want to lose.',
      userId: don._id
    }
  ]);

  await Tweet.create([
    {
      content: 'My name is Joe Biden and I approve this message.',
      userId: joe._id
    },
    {
      content: 'I am the 46th president of the United States of America',
      userId: joe._id
    },
    {
      content: 'I like driving my corvette.',
      userId: joe._id
    }
  ]);

  await Tweet.create([
    {
      content: 'I like money',
      userId: jeff._id
    },
    {
      content: 'I like alexa',
      userId: jeff._id
    },{
      content: 'I like amazon web service',
      userId: jeff._id
    }
  ]);

  await Tweet.create([
    {
      content: 'I like computers',
      userId: bill._id
    },
    {
      content: 'I like windows laptops',
      userId: bill._id
    },
    {
      content: 'I like xbox',
      userId: bill._id
    }
  ]);

  await Tweet.create([
    {
      content: 'I like apple products',
      userId: steve._id
    },
    {
      content: 'I like apple vision pro',
      userId: steve._id
    },
    {
      content: 'I like charging cables',
      userId: steve._id
    }
  ]);

  console.log('done');
  process.exit(0)
}