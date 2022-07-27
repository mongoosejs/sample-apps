'use strict';

const stripe = require('../../integrations/stripe');
const { Cart, Order } = require('../../models');
const connect = require('../../connect');

const handler = async(event) => {
  try {
    event.body = JSON.parse(event.body || {});
    await connect();
    const cart = await Cart.
      findOne({ _id: event.body.cartId }).
      setOptions({ sanitizeFilter: true }).
      orFail();
    const session = await stripe.checkout.sessions.retrieve(event.body.sessionId);
    if (session == null) throw new Error('No checkout session found');
    const intent = await stripe.paymentIntents.retrieve(session.payment_intent);
    if (intent.status !== 'succeeded') {
      throw new Error(`Order creation failed because intent has status "${intent.status}"`);
    }
    const exists = await Order.findOne({sessionId: session.id});
    if (exists) return { statusCode: 200, body: JSON.stringify({ message: 'Order already exists in database', order: exists})};
    const paymentMethod = await stripe.paymentMethods.retrieve(intent['payment_method']);
    const orders = await Order.find();
    const orderNumber = orders.length ? orders.length + 1 : 1;
    let products = JSON.parse(session.metadata.products);
    const order = await Order.create({
      items: products,
      total: session.amount_total,
      orderNumber: orderNumber,
      name: session.customer_details.name,
      email: session.customer_details.email,
      address1: session.customer_details.address.line1,
      city: session.customer_details.address.city,
      state: session.customer_details.address.state,
      zip: session.customer_details.address.postal_code,
      shipping: session.metadata.shippingType,
      paymentMethod: paymentMethod ? { id: paymentMethod.id, brand: paymentMethod.brand, last4: paymentMethod.last4 } : null,
      sessionId: session.id
    });

    cart.orderId = order._id;
    await cart.save();
    await Cart.updateOne({_id: event.body.cartId}, {$set: {items: []}});
    return {
      statusCode: 200,
      body: JSON.stringify({ order: order, cart: cart, session: session }),
    };
  } catch (error) {
    console.log('what the fuck is the error', error)
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
