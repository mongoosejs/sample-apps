'use strict';

const { describe, it } = require('mocha');
const assert = require('assert');
const { handler: addToCart } = require('../netlify/functions/addToCart');
const { handler: checkout } = require('../netlify/functions/checkout');
const fixtures = require('./fixtures');
const sinon = require('sinon');
const stripe = require('../integrations/stripe');
const { Cart } = require('../models');

describe('Checkout', function() {
  it('Should do a successful checkout run', async function() {
    const products = await fixtures.createProducts({
      product: [
        { name: 'A Test Products', price: 500 },
        { name: 'Another Test Product', price: 600 }
      ]
    }).then((res) => res.products);
    const params = {
      body: {
        cartId: null,
        item: { productId: products[0]._id, quantity: 2 }
      }
    };
    params.body = JSON.stringify(params.body);
    const result = await addToCart(params);
    result.body = JSON.parse(result.body);
    sinon.stub(stripe.checkout.sessions, 'create').returns({ status: 'succeeded', id: '123' });
    assert(result.body);
    assert(result.body.items.length);
    params.body.cartId = result.body._id;
    params.body = JSON.stringify(params.body);
    const finish = await checkout(params);
    finish.body = JSON.parse(finish.body);
    const cart  = await Cart.findById({ _id: params.body.cartId});
    assert(cart.checkoutSessionId);
    assert(finish.body.session.id);
    assert.equal(cart.checkoutSessionId, finish.body.session.id);
    assert.equal(finish.body.session.status, 'succeeded');
  });
});
