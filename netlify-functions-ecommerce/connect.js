'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

module.exports = async function connect() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
};
