'use strict';

const { Product } = require('./models');
const connect = require('./connect');
const mongoose = require('mongoose');

async function createProducts() {
  await connect();
  
  await Product.db.dropCollection('products');
  await Product.createCollection();

  await Product.create({
    name: 'iPhone 12',
    price: 500,
    image: '/images/iphone-12.png'
  });

  await Product.create({
    name: 'iPhone SE',
    price: 600,
    image: '/images/iphone-se.png'
  });

  await Product.create({
    name: 'iPhone 12 Pro',
    price: 700,
    image: '/images/iphone-12-pro.png'
  });

  await Product.create({
    name: 'iPhone 11',
    price: 800,
    image: '/images/iphone-11.png'
  });

  const products = await Product.find();
  console.log('done', products.length, products);
  process.exit(0);
}

createProducts();
