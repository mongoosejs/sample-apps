'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('navbar', {
  extends: BaseComponent(require('./navbar.html'), require('./navbar.css'))
});