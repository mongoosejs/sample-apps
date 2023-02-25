'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('cart', {
  inject: ['state'],
  computed: {
    cartTotal() {
      return '$' + this.state.cart.items.reduce((sum, item) => {
        return sum + (+(item.quantity * this.product(item).price).toFixed(2))
      }, 0).toFixed(2);
    }
  },
  methods: {
    product(item) {
      const product = this.state.products.find(product => product._id === item.productId);
      return product;
    },
    formatTotal(item, product) {
      if (!product) {
        return '';
      }
      const total = (item.quantity * product.price).toFixed(2);
      return `$${total}`;
    }
  },
  extends: BaseComponent(require('./cart.html'), require('./cart.css'))
});