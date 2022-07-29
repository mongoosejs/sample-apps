'use strict';

const { describe, it } = require('mocha');
const assert = require('assert');
const { handler: addToCart } = require('../netlify/functions/addToCart');
const { handler: removeFromCart } = require('../netlify/functions/removeFromCart');
const fixtures = require('./fixtures');

describe('Remove From Cart', function() {
  it('Should create a cart and then it should remove the entire item from it.', async function() {
    const products = await fixtures.createProducts({
      product: [
        { name: 'A Test Products', price: 500 },
        { name: 'Another Test Product', price: 600 }
      ]
    }).then((res) => res.products);
    const params = {
      body: {
        cartId: null,
        item: { productId: products[0]._id, quantity: 2 },
      }
    };
    params.body = JSON.stringify(params.body);
    const result = await addToCart(params);
    result.body = JSON.parse(result.body);
    assert(result.body);
    assert.equal(result.body.items.length, 1);
    const newParams = {
      body: {
        cartId: result.body._id,
        item: {
          productId: products[0]._id
        }
      }
    };
    newParams.body = JSON.stringify(newParams.body);
    const remove = await removeFromCart(newParams);
    remove.body = JSON.parse(remove.body);
    assert.equal(remove.body.items.length, 0);
  });

  it('Should create a cart and then it should reduce the quantity of an item from it.', async function() {
    const products = await fixtures.createProducts({ product: [{ productName: 'A Test Products', productPrice: 500 }, { productName: 'Another Test Product', productPrice: 600 }] })
      .then((res) => res.products);
    const params = {
      body: {
        cartId: null,
        item: { productId: products[0]._id, quantity: 2 },
 
      }
    };
    params.body = JSON.stringify(params.body);
    const result = await addToCart(params);
    result.body = JSON.parse(result.body);
    assert(result.body);
    assert(result.body.items.length);
    const newParams = {
      body: {
        cartId: result.body._id,
        item: {
          productId: products[0]._id,
          quantity: 1
        }
      }
    };
    newParams.body = JSON.stringify(newParams.body);
    const remove = await removeFromCart(newParams);
    remove.body = JSON.parse(remove.body);
    assert.equal(remove.body.items[0].quantity, 1);
  });
});
