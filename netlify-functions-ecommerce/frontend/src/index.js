'use strict';

const routes = require('./routes');

const app = Vue.createApp({
  setup() {
    const cartId = window.localStorage.getItem('__cartKey') || null;

    const state = Vue.reactive({
      cartId,
      cart: null
    });

    Vue.provide('state', state);

    return state;
  },
  async mounted() {
    if (!this.cartId) {
      return;
    } 

    const cartId = encodeURIComponent(this.cartId);
    const cart = await fetch('/.netlify/functions/getCart?cartId=' + cartId).
      then(res => res.json());
    this.cart = cart;
  },
  template: '<app-component />'
});

app.component('app-component', {
  template: `
  <div>
    <navbar />
    <div class="view">
      <router-view />
    </div>
  </div>
  `
});

require('./home/home')(app);
require('./navbar/navbar')(app);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: routes.map(route => ({
    ...route,
    component: app.component(route.name),
    props: (route) => route.params
  }))
});

router.replace(window.location.pathname);

app.use(router);

app.mount('#content');