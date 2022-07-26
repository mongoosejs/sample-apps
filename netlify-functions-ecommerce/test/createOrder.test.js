'use strict';

const { describe, it } = require('mocha');
const assert = require('assert');
const { handler: addToCart } = require('../netlify/functions/addToCart');
const { handler: checkout } = require('../netlify/functions/checkout');
const { handler: createOrder } = require('../netlify/functions/createOrder');
const fixtures = require('./fixtures');
const sinon = require('sinon');
const stripe = require('../integrations/stripe');

describe('Create Order', function() {
  it('Should successfully create an order', async function() {
    const products = await fixtures.createProducts({
      product: [
        { name: 'A Test Products', price: 500 },
        { name: 'Another Test Product', price: 600 }
      ]
    }).then((res) => res.products);
  });
});
