Cypress.Commands.add('generateRandomProductName', () => {
    const adjectives = ['Incrível', 'Fantástico', 'Mágico', 'Maravilhoso', 'Exclusivo', 'Premium'];
    const nouns = ['Produto', 'Item', 'Acessório', 'Equipamento', 'Artigo', 'Gadget'];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000); // Adiciona um número aleatório para maior singularidade
  
    return `${randomAdjective} ${randomNoun} ${randomNumber}`;
  });
  
  

Cypress.Commands.add('listProducts', () => {
    return cy.request('GET', '/produtos') 
      .then((response) => {
        expect(response.status).to.eq(200); 
        return response.body;
    });
});

Cypress.Commands.add('createProduct', (productData) => {
    const token = Cypress.env('token');
    return cy.request({
      method: 'POST',
      url: '/produtos',
      body: productData,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      return response; 
    });
});

Cypress.Commands.add('getProductById', (productId) => {
  return cy.request({
    method: 'GET',
    url: `/produtos/${productId}`, 
    failOnStatusCode: false 
  }).then((response) => {
    return response; 
  });
});
