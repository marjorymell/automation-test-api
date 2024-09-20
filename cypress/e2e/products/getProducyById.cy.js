describe('Get Product by ID API Testing', () => {
    beforeEach(() => {
      cy.fixture('product').as('productsData'); 
    });
  
    it('GET product by valid ID', function() {
      const validProductId = this.productsData.productIds.validProductId;
  
      cy.getProductById(validProductId).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('nome');
        expect(response.body).to.have.property('preco');
        expect(response.body).to.have.property('descricao');
        expect(response.body).to.have.property('quantidade');
        expect(response.body).to.have.property('_id'); 
      });
    });
  
    it('GET product by invalid ID', function() {
      const invalidProductId = this.productsData.productIds.invalidProductId;
  
      cy.getProductById(invalidProductId).then((response) => {
        expect(response.status).to.eq(400); 
        expect(response.body).to.have.property('message', 'Produto não encontrado');
      });
    });
  });