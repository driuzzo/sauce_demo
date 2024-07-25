const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,  
  defaultCommandTimeout: 5000,
  
  e2e: {
    experimentalSessionSupport: true,
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
