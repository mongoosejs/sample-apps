'use strict';

const User = require('../models/User');

module.exports = async function getTweeters(req, res) {
  const users = await User.find();
  return res.status(200).json({ dropdownItems: users, status: 'succeeded' });
}