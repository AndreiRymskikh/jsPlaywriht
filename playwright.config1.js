// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './testsF',
  reporter: 'html',
  projects : [
    {
      name : 'safari',
      use: {
        timeout: 30 * 1000,
        expect: {
          timeout: 5000
        },
        browserName : 'webkit',
        headless : false,
        screenshot : 'off',
        trace : 'on'
      }
    },
    {
      name : 'chrome',
      use: {
        timeout: 30 * 1000,
        expect: {
          timeout: 5000
        },
        browserName : 'chromium',
        headless : false,
        screenshot : 'on',
        trace : 'on'
      }
    }
  ]
  
});

