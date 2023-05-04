'use strict';

console.log('Connecting to', process.env.JSON_API_URL);

module.exports = Object.freeze({
  jsonApiUrl: process.env.JSON_API_URL,
  jsonApiConnectOptions: {
    isAstra: true,
    createNamespaceOnConnect: false
  },
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeSuccessUrl: 'https://deploy-preview-1--amazing-cassata-75f094.netlify.app/order-confirmation',
  stripeCancelUrl: 'https://deploy-preview-1--amazing-cassata-75f094.netlify.app/cart'
});

