process.env.TS_NODE_PROJECT = '../../tsconfig.json'
process.env.MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/vehicle-review'
require('ts-mocha');
const Mocha = require('mocha');

const mocha = new Mocha();
mocha.addFile(`./User.test.ts`);
mocha.run((failures) => {
  process.on('exit', () => {
    process.exit('The failures', failures);
  })
})