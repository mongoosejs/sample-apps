'use strict';

module.exports = Object.freeze({
  mongodbUri: 'mongodb://localhost:27017/ecommerce',
  stripeSecretKey: 'YOUR STRIPE KEY HERE',
  stripeSuccessUrl: 'http://localhost:8888/order-confirmation',
  stripeCancelUrl: 'http://localhost:8888/cart'
});