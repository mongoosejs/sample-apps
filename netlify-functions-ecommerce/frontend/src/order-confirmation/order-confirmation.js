'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('order-confirmation', {
  inject: ['state'],
  data: () => ({ order: null }),
  async mounted() {
    if (!this.state.cartId) {
      return this.$router.push('/');
    }

    const res = await fetch('/.netlify/functions/confirmOrder', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartId: this.state.cartId
      })
    }).then(res => res.json());
    if (res.order) {
      this.order = res.order;

      window.localStorage.removeItem('__cartKey');
      this.state.cartId = null;
      this.state.cart = null;
    }
  },
  extends: BaseComponent(require('./order-confirmation.html'), require('./order-confirmation.css'))
});