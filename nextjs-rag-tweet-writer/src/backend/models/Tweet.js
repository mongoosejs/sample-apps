const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  $vector: {
    type: [Number]
  }
}, { timestamps: true });


const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;