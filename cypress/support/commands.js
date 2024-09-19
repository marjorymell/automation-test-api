Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: { email, password },
      headers: { 'Content-Type': 'application/json' },
      failOnStatusCode: false
    });
});
  