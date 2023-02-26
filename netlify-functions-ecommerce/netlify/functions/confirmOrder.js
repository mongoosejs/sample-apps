'use strict';

const stripe = require('../../integrations/stripe');
const { Cart, Order } = require('../../models');
const config = require('../../.config');
const connect = require('../../connect');

const handler = async(event) => {
  try {
    event.body = JSON.parse(event.body || {});
    await connect();
    const cart = await Cart.
      findOne({ _id: event.body.cartId }).
      setOptions({ sanitizeFilter: true }).
      orFail();
    
    if (cart.orderId) {
      const order = await Order.findOne({ _id: cart.orderId }).orFail();

      return {
        statusCode: 200,
        body: JSON.stringify({ cart, order })
      };
    }
    if (config.stripeSecretKey === 'YOUR STRIPE KEY HERE') {
      const order = await Order.create({
        items: cart.items,
        name: 'Stripe Test',
        total: cart.total,
        paymentMethod: {
          id: 'test-stripe-payment-method-id',
          brand: 'visa',
          last4: '0000'
        }
      });
  
      cart.orderId = order._id;
      await cart.save();

      return {
        statusCode: 200,
        body: JSON.stringify({ cart, order })
      };
    }

    if (!cart.stripeSessionId) {
      throw new Error('Cart needs stripe session id');
    }
    

    const session = await stripe.checkout.sessions.retrieve(cart.stripeSessionId);

    if (session['payment_status'] === 'paid') {
      const intent = await stripe.paymentIntents.retrieve(session.payment_intent);
      const paymentMethod = await stripe.paymentMethods.retrieve(intent['payment_method']);

      const order = await Order.create({
        items: cart.items,
        name: session['customer_details'].name,
        total: +(session['amount_total'] / 100).toFixed(2),
        paymentMethod: paymentMethod?.card ?
          { id: paymentMethod.id, brand: paymentMethod.card.brand, last4: paymentMethod.card.last4 } :
          null
      });
  
      cart.orderId = order._id;
      await cart.save();

      return {
        statusCode: 200,
        body: JSON.stringify({ cart, order })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Stripe checkout session has invalid status "${session.status}"`
      })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
