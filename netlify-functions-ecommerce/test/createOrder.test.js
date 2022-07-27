'use strict';

const { describe, it } = require('mocha');
const assert = require('assert');
const { handler: createOrder } = require('../netlify/functions/createOrder');
const { handler: addToCart } = require('../netlify/functions/addToCart');
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
    sinon.stub(stripe.paymentIntents, 'retrieve').returns({ status: 'succeeded', id: '123', brand: 'visa', last4: '1234' });
    sinon.stub(stripe.paymentMethods, 'retrieve').returns({ status: 'succeeded', id: '123', brand: 'visa', last4: '1234' });
    const params = {
      body: {
        cartId: null,
        items: [
          { productId: products[0]._id, quantity: 2 },
          { productId: products[1]._id, quantity: 1 }
        ]
      }
    };
    params.body = JSON.stringify(params.body);
    const result = await addToCart(params);
    result.body = JSON.parse(result.body);
    sinon.stub(stripe.checkout.sessions, 'retrieve').returns({
      status: 'succeeded', 
      id: '123', 
      brand: 'visa', 
      last4: '1234' ,
      metadata: {
       products: JSON.stringify(result.body.items),
       shippingType: 'standard'
      },
      customer_details: {
       name: 'Test Testerson',
       email: 'test@localhost.com',
       address: {
         line1: '12345 Syndey Street',
         city: 'Miami',
         state: 'Florida',
         postal_code: '33145'
       }
      },
      amount_total: 1600,
   });
    const newParams = {
      body: {
        cartId: result.body._id,
        sessionId: '123',
      }
    };
    newParams.body = JSON.stringify(newParams.body)
    const order = await createOrder(newParams);
    order.body = JSON.parse(order.body);
    assert(order.body.order);
    assert(order.body.cart);
    assert(order.body.session);
  });
});
