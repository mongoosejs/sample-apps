'use strict';

const Tweet = require('../models/Tweet');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: '../../.env' });

module.exports = async function writeTweet(req, res) {

  console.log('what is req', req.body);
  const embedding = await createEmbedding(req.body.content);

  const tweets = await Tweet.find({ userId: req.body.user }).limit(3).sort({ $vector: { $meta: embedding } });

  const prompt = systemPrompt(tweets);
  const answers = await makeChatGPTRequest(prompt, req.body.content);
  return res.json({ sources: tweets.map(x => ({ content: x.content, createdAt: new Date(x.createdAt).toDateString() })), answer: answers })
}

const systemPrompt = (tweets, question) => `
You are a helpful assistant that takes content from users and creates a twitter post in the style of someone else indicated to you.

${tweets.map(tweet => 'Tweet: ' + tweet.content).join('\n\n')}
`.trim();

function createEmbedding(input) {
  return axios({
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    data: {
      model: 'text-embedding-ada-002',
      input
    }
  }).then(res => res.data.data[0].embedding);
}

function makeChatGPTRequest(systemPrompt, input) {
  const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    data: {
      model: 'gpt-3.5-turbo-1106',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input }
      ]
    }
  };

  return axios(options).then(res => res.data);
}