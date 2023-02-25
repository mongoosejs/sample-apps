/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/src/BaseComponent.js":
/*!***************************************!*\
  !*** ./frontend/src/BaseComponent.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = (html, css) => {
  appendCSS(css);
  return {
    template: html,
    destroyed() {
      this.$parent.$options.$children = this.$parent.$options.$children.filter(el => el !== this);
    },
    created() {
      this.$parent.$options.$children = this.$parent.$options.$children || [];
      this.$parent.$options.$children.push(this);
    }
  };
};

function appendCSS(css) {
  if (!css) {
    return;
  }
  if (typeof document === 'undefined') {
    return;
  }
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

/***/ }),

/***/ "./frontend/src/home/home.js":
/*!***********************************!*\
  !*** ./frontend/src/home/home.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const BaseComponent = __webpack_require__(/*! ../BaseComponent */ "./frontend/src/BaseComponent.js");

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
  extends: BaseComponent(__webpack_require__(/*! ./home.html */ "./frontend/src/home/home.html"), __webpack_require__(/*! ./home.css */ "./frontend/src/home/home.css"))
});

/***/ }),

/***/ "./frontend/src/navbar/navbar.js":
/*!***************************************!*\
  !*** ./frontend/src/navbar/navbar.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const BaseComponent = __webpack_require__(/*! ../BaseComponent */ "./frontend/src/BaseComponent.js");

module.exports = app => app.component('navbar', {
  inject: ['state'],
  extends: BaseComponent(__webpack_require__(/*! ./navbar.html */ "./frontend/src/navbar/navbar.html"), __webpack_require__(/*! ./navbar.css */ "./frontend/src/navbar/navbar.css"))
});

/***/ }),

/***/ "./frontend/src/routes.js":
/*!********************************!*\
  !*** ./frontend/src/routes.js ***!
  \********************************/
/***/ ((module) => {

"use strict";


module.exports = [
  {
    path: '/',
    name: 'home'
  }
];

/***/ }),

/***/ "./frontend/src/home/home.css":
/*!************************************!*\
  !*** ./frontend/src/home/home.css ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = ".home {\n  margin-bottom: 80px;\n}\n\n.home .hero {\n  background-color: #CFFC7B;\n  padding: 50px;\n  position: relative;\n  overflow: hidden;\n}\n\n.home .hero h1 {\n  line-height: 1.25em;\n}\n\n.home .hero button {\n  padding: 10px 15px;\n  border-radius: 8px;\n  color: white;\n  background-color: #43783E;\n  border: 0px;\n  font-size: 1.5em;\n  margin-top: 10px;\n}\n\n.home .hero img {\n  width: 33%;\n  position: absolute;\n  right: 15px;\n  top: -10px;\n}\n\n.home .iphone {\n  width: 25%;\n}\n\n.home .iphone .image-wrapper {\n  background-color: #ddd;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n.home .iphone img {\n  width: 100%;\n}\n\n.home .iphone-container {\n  display: flex;\n  gap: 15px;\n}\n\n.home .iphone .info-wrapper {\n  font-weight: bold;\n  display: flex;\n  margin-top: 0.5em;\n}\n\n.home .iphone .info-wrapper .price {\n  text-align: right;\n  flex-grow: 1;\n}\n\n.home .add-to-cart button {\n  background-color: white;\n  border: 2px solid #43783E;\n  color: #43783E;\n  padding: 0.5em 0.5em;\n  border-radius: 8px;\n  margin-top: 0.5em;\n  cursor: pointer;\n}\n\n.home .add-to-cart button:hover {\n  background-color: #43783E;\n  border: 2px solid #43783E;\n  color: white;\n}";

/***/ }),

/***/ "./frontend/src/home/home.html":
/*!*************************************!*\
  !*** ./frontend/src/home/home.html ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"home\">\n  <div class=\"hero\">\n    <div class=\"image-bg\">\n      <img src=\"/images/woman-with-iphone.png\">\n    </div>\n    <h1>\n      Get the Latest iPhones<br>at the Best Prices \n    </h1>\n    <a href=\"#iphones-for-you\">\n      <button>Shop Now!</button>\n    </a>\n  </div>\n  <div>\n    <h2>iPhones For You</h2>\n\n    <div class=\"iphone-container\">\n      <div v-for=\"product in products\" class=\"iphone\">\n        <div class=\"image-wrapper\">\n          <img :src=\"product.image\">\n        </div>\n        <div class=\"info-wrapper\">\n          <div>\n            {{product.name}}\n          </div>\n          <div class=\"price\">\n            {{formatPrice(product.price)}}\n          </div>\n        </div>\n        <div class=\"add-to-cart\">\n          <button @click=\"addToCart(product)\">\n            Add to Cart\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";

/***/ }),

/***/ "./frontend/src/navbar/navbar.css":
/*!****************************************!*\
  !*** ./frontend/src/navbar/navbar.css ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = ".navbar {\n  max-width: 1000px;\n  display: flex;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 25px;\n}\n\n.navbar img {\n  vertical-align: middle;\n}\n\n.navbar .logo {\n  flex-grow: 0;\n  font-size: 2em;\n}\n\n.navbar .logo img {\n  height: 45px;\n}\n\n.navbar .nav-center {\n  flex-grow: 1;\n}\n\n.navbar .right {\n  padding-top: 11px;\n}\n\n.navbar .right img {\n  height: 1.5em;\n  margin-right: 0.5em;\n}";

/***/ }),

/***/ "./frontend/src/navbar/navbar.html":
/*!*****************************************!*\
  !*** ./frontend/src/navbar/navbar.html ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"navbar\">\n  <div class=\"logo\">\n    <img src=\"images/logo.png\">\n    iPhoneMarket\n  </div>\n  <div class=\"nav-center\">&nbsp;</div>\n  <div class=\"right\">\n    <img src=\"images/shopping-cart.svg\">\n    <span>Cart</span>\n    <span v-if=\"state.cart\">{{state.cart.items.length}}</span>\n  </div>\n</div>";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./frontend/src/index.js ***!
  \*******************************/


const routes = __webpack_require__(/*! ./routes */ "./frontend/src/routes.js");

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

__webpack_require__(/*! ./home/home */ "./frontend/src/home/home.js")(app);
__webpack_require__(/*! ./navbar/navbar */ "./frontend/src/navbar/navbar.js")(app);

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
})();

/******/ })()
;