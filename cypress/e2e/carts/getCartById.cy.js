describe('Get Cart by ID API Testing', () => {
    beforeEach(() => {
      cy.fixture('cart').as('cartsData'); 
    });
  
    it('GET product by valid ID', function() {
        const validCartId = this.cartsData.validCart.id;
      
        cy.getCartById(validCartId).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('produtos').and.be.an('array');
          expect(response.body).to.have.property('precoTotal');
          expect(response.body).to.have.property('quantidadeTotal');
          expect(response.body).to.have.property('idUsuario');
          expect(response.body).to.have.property('_id');
      
          // Flatten the produtos array in case it's nested
          const produtos = response.body.produtos.flat(); 
      
          // Ensure produtos is now a flat array and not empty
          expect(produtos).to.be.an('array').and.have.length.greaterThan(0);
      
          // Loop through each product in the produtos array
          produtos.forEach((produto) => {
            expect(produto).to.have.property('idProduto');
            expect(produto).to.have.property('quantidade');
            expect(produto).to.have.property('precoUnitario');
          });
        });
      });
      
      
  
    it('GET product by invalid ID', function() {
        const invalidCartId = this.cartsData.invalidCart.id;
  
      cy.getCartById(invalidCartId).then((response) => {
        expect(response.status).to.eq(400); 
        expect(response.body).to.have.property('message', 'Carrinho não encontrado');
      });
    });
  });