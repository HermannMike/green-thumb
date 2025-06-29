module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3002',
    specPattern: 'frontend/cypress/e2e/**/*.cy.js',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
};
