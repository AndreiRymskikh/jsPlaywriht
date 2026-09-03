module.exports = {
  default: {
    paths: ['tests/cucumberTests/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'tests/cucumberTests/testSetup/**/*.ts',
      'stepDefinitions/**/*.ts'
    ],
    format: ['progress']
  }
};
