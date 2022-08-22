'use strict';

const mongoose = require('mongoose');

const { driver } = require('stargate-mongoose');
mongoose.setDriver(driver);

module.exports = mongoose;