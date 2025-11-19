# netlify-functions-ecommerce

This sample demonstrates using Mongoose to build an eCommerce shopping cart using [Netlify Functions](https://www.netlify.com/products/functions/), which runs on [AWS Lambda](https://mongoosejs.com/docs/lambda.html).

Other tools include:

1. Stripe for payment processing
2. [Mocha](https://masteringjs.io/mocha) and [Sinon](https://masteringjs.io/sinon) for testing

## Running This Example

1. Make sure you have a MongoDB instance running on `localhost:27017`, or copy an Atlas connection string
2. `cp .env.example .env` and update `MONGODB_CONNECTION_STRING` and `STRIPE_SECRET_KEY` (if you have one)
3. Run `npm install`
4. Run `npm run seed`
5. Run `npm start`
6. Visit `http://localhost:8888` to view the app

## Testing

Make sure you have a MongoDB instance running on `localhost:27017`, or update the `MONGODB_CONNECTION_STRING` variable in `.env.test`.
Then run `npm test`.

```sh
$ npm test

> test
> env NODE_ENV=test mocha ./test/*.test.js

Using test


  Add to Cart
    ✔ Should create a cart and add a product to the cart
    ✔ Should find the cart and add to the cart
    ✔ Should find the cart and increase the quantity of the item(s) in the cart

  Checkout
    ✔ Should do a successful checkout run

  Get the cart given an id
    ✔ Should create a cart and then find the cart.

  Products
    ✔ Should get all products.

  Remove From Cart
    ✔ Should create a cart and then it should remove the entire item from it.
    ✔ Should create a cart and then it should reduce the quantity of an item from it.


  8 passing (112ms)

```
