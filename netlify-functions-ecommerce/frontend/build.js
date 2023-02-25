'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

try {
  fs.mkdirSync(path.join(__dirname, '..', 'public', 'vanillatoasts'));
} catch (err) {}

fs.copyFileSync(
  path.join(__dirname, '..', 'node_modules', 'vanillatoasts', 'vanillatoasts.css'),
  path.join(__dirname, '..', 'public', 'vanillatoasts', 'vanillatoasts.css')
);

const routes = require('./src/routes');
let toml = '';
const createTomlRedirect = route => `
[[redirects]]
  from = "${route.replace(/:\w+/g, '*')}"
  to = "/"
  status = 200
`.trim();
for (const route of routes) {
  if (route.path === '/') {
    continue;
  }
  toml += '\n\n' + createTomlRedirect(route.path);
}
fs.writeFileSync(path.join(__dirname, '..', 'netlify.toml'), toml.trim());

const compiler = require('webpack')(require('./webpack.config'));

compiler.run(err => {
  if (err) {
    process.nextTick(() => { throw new Error('Error compiling bundle: ' + err.message); });
  }
  console.log('Webpack compiled successfully');
});