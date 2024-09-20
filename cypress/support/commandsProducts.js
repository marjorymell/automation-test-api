Cypress.Commands.add('listProducts', () => {
    return cy.request('GET', '/produtos') 
      .then((response) => {
        expect(response.status).to.eq(200); 
        return response.body;
    });
});