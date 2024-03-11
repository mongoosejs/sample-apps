
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const writeTweet = require('./api/writeTweet');
const getTweeters = require('./api/getTweeters');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: '../.env' });

async function initializeBackend() {

  const app = express();
  // Middleware
  app.use(bodyParser.json());
  app.use(cors());

  await mongoose.connect(process.env.CONNECTIONSTRING);

  // Routes

  app.get('/', (req, res) => {
    return res.send({ message: 'Hello There!'});
  });

  app.post('/write-tweet', writeTweet);

  app.get('/get-tweeters', getTweeters)

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Start the server
  await new Promise((resolve, reject) => {
    app.listen(port, (err) => {
      if (err) {
        console.error('Error starting server:', err);
        reject(err);
      } else {
        console.log(`Server is running on port ${port}`);
        resolve();
      }
    });
  });
}

initializeBackend().catch(err => {
  console.error('Error initializing backend:', err);
});