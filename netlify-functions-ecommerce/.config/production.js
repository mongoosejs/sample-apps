'use strict';

module.exports = Object.freeze({
  jsonApiUrl: process.env.JSON_API_URL,
  jsonApiConnectOptions: {
    isAstra: true,
    createNamespaceOnConnect: false
  },
  stripeSecretKey: 'test',
  stripeSuccessUrl: 'https://deploy-preview-1--amazing-cassata-75f094.netlify.app/order-confirmation',
  stripeCancelUrl: 'https://deploy-preview-1--amazing-cassata-75f094.netlify.app/cart'
});

