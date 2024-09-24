Cypress.Commands.add('listCarts', () => {
    return cy.request('GET', '/carrinhos') 
      .then((response) => {
        expect(response.status).to.eq(200); 
        return response.body;
    });
});