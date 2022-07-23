'use strict';

module.exports = Object.freeze({
  astraUri: process.env.ASTRA_URI,
  stripeSecretKey: 'test',
  stripeSuccessUrl: 'localhost:3000/success',
  stripeCancelUrl: 'localhost:3000/cancel'
});