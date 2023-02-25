'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('products', {
  inject: ['state'],
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
    async addToCart(product) {
      const body = {
        items: [{ productId: product._id, quantity: 1 }]
      };
      if (this.state.cart) {
        body.cartId = this.state.cart._id;
      }
      const res = await fetch('/.netlify/functions/addToCart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => res.json());
      this.state.cart = res;
      if (!this.state.cartId) {
        this.state.cartId = res._id;
        window.localStorage.setItem('__cartKey', res._id);
      }
    }
  },
  extends: BaseComponent(require('./products.html'), require('./products.css'))
});