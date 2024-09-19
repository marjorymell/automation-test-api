Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: { email, password },
      headers: { 'Content-Type': 'application/json' },
      failOnStatusCode: false
    }).then((response) => {
      return response; 
    });
});
  
Cypress.Commands.add('listUsers', () => {
    return cy.request('GET', '/usuarios') 
      .then((response) => {
        expect(response.status).to.eq(200); 
        return response.body;
    });
});
  
Cypress.Commands.add('getUserById', (userId) => {
    return cy.request({
      method: 'GET',
      url: `/usuarios/${userId}`, 
      failOnStatusCode: false 
    }).then((response) => {
      return response; 
    });
});
  