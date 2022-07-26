'use strict';

const stripe = require('../../integrations/stripe');
const config = require('../../.config');
const { Cart, Order, Product } = require('../../models');
const connect = require('../../connect');

const handler = async(event) => {
  try {
    event.body = JSON.parse(event.body || {});
    await connect();
    const cart = await Cart.
      findOne({ _id: event.body.cartId }).
      setOptions({ sanitizeFilter: true }).
      orFail();

    const stripeProducts = { line_items: [] };
    let total = 0;
    for (let i = 0; i < cart.items.length; i++) {
      const product = await Product.findOne({ _id: cart.items[i].productId });
      stripeProducts.line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name
          },
          unit_amount: product.price
        },
        quantity: cart.items[i].quantity
      });
      total = total + (product.price * cart.items[i].quantity);
    }
    const session = await stripe.checkout.sessions.create({
      line_items: stripeProducts.line_items,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
      },
      metadata: {shippingType: event.body.shippingType},
      mode: 'payment',
      success_url: config.stripeSuccessUrl+'?id={CHECKOUT_SESSION_ID}',
      cancel_url: config.stripeCancelUrl
    });
    cart.checkoutSessionId = session.id;
    await cart.save();
    return {
      statusCode: 200,
      body: JSON.stringify({ session: session }),
    };
  } catch (error) {
    console.log('what the fuck is the error', error)
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
