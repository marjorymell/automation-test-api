Cypress.Commands.add('listCarts', () => {
    return cy.request('GET', '/carrinhos') 
      .then((response) => {
        expect(response.status).to.eq(200); 
        return response.body;
    });
});

Cypress.Commands.add('createCart', (cartData) => {
  const token = Cypress.env('token');
  return cy.request({
    method: 'POST',
    url: '/carrinhos',
    body: cartData,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  }).then((response) => {
    return response; 
  });
});

Cypress.Commands.add('cancelCart', () => {
  const token = Cypress.env('token');
  return cy.request({
    method: 'DELETE',
    url: `/carrinhos/cancelar-compra`,
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json' 
    },
    failOnStatusCode: false
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add('deleteCart', () => {
  const token = Cypress.env('token');
  return cy.request({
    method: 'DELETE',
    url: `/carrinhos/concluir-compra`,
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json' 
    },
    failOnStatusCode: false
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add('getCartById', (cartId) => {
  return cy.request({
    method: 'GET',
    url: `/carrinhos/${cartId}`, 
    failOnStatusCode: false 
  }).then((response) => {
    return response; 
  });
});