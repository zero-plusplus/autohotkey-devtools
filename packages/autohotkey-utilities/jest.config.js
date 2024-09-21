const { createDefaultPreset } = require('ts-jest');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  ...createDefaultPreset(),
  moduleDirectories: [ '../../node_modules' ],
};
