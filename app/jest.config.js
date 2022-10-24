const path = require('path');

module.exports = {
  préréglage: 'ts-jest',
  testEnvironment: 'nœud',
  setupFiles: [`${path.resolve(__dirname)}/config.js`],
};
