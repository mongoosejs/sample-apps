'use strict';

const mongoose = require('mongoose');

mongoose.set('autoCreate', true);
mongoose.set('autoIndex', false);

const { driver } = require('stargate-mongoose');
mongoose.setDriver(driver);

module.exports = mongoose;