# netlify-functions-ecommerce

This sample demonstrates using Mongoose to build an eCommerce shopping cart using [Netlify Functions](https://www.netlify.com/products/functions/), which runs on [AWS Lambda](https://mongoosejs.com/docs/lambda.html).

Other tools include:

1. Stripe for payment processing
2. [Mocha](https://masteringjs.io/mocha) and [Sinon](https://masteringjs.io/sinon) for testing

## Running This Example

1. Set `ASTRA_URI` environment variable to point to your Astra instance in below format
``
https://${databaseId}-${region}.apps.astra.datastax.com/${keyspace}?applicationToken=${applicationToken}
``
2. Run `npm install`
3. Run `npm run seed`
4. Run `npm start`
5. Visit `http://localhost:8888/.netlify/functions/getProducts` to list all available products
6. Run `npm run test:smoke` to run a smoke test against `http://localhost:8888` that creates a cart using [Axios](https://masteringjs.io/axios).
7. Run other endpoints using curl or postman

## Testing

Make sure you have an AstraDB instance running on your Astra account or a local stargate instance running, then set up the below environment variables as required
* ``ASTRA_URI`` (if AstraDB) OR 
* ``STARGATE_BASE_URL``,  ``STARGATE_AUTH_URL``, ``STARGATE_USERNAME`` and ``STARGATE_PASSWORD`` (if stargate instance).

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
