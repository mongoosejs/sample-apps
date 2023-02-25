'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('home', {
  data: () => ({ products: [] }),
  async mounted() {
    const res = await fetch('/.netlify/functions/getProducts').then(res => res.json());
    this.products = res;
  },
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    }
  },
  extends: BaseComponent(require('./home.html'), require('./home.css'))
});