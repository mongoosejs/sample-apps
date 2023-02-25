'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('home', {
  inject: ['state'],
  data: () => ({ products: [] }),
  async mounted() {
    const res = await fetch('/.netlify/functions/getProducts').then(res => res.json());
    this.products = res;
  },
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
    }
  },
  extends: BaseComponent(require('./home.html'), require('./home.css'))
});