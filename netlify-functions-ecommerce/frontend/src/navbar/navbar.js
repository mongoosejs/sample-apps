'use strict';

const BaseComponent = require('../BaseComponent');

module.exports = app => app.component('navbar', {
  inject: ['state'],
  extends: BaseComponent(require('./navbar.html'), require('./navbar.css'))
});