module.exports = {
  default: {
    paths: ['cucumberTests/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'cucumberTests/support/**/*.ts',
      'stepDefinitions/**/*.ts'
    ],
    format: ['progress']
  }
};
