'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const { name, version } = JSON.parse(fs.readFileSync('./package.json'));

execSync('npm pack');
execSync(`mv ${name}-${version}.tgz ../${name}.tgz`);