describe('Cart Listing API Testing', () => {
    it('GET all carts', () => {
      cy.listCarts().then((data) => {
        expect(data).to.have.property('quantidade');
        expect(data.quantidade).to.be.greaterThan(0);
  
        expect(data).to.have.property('carrinhos');
        expect(data.carrinhos).to.be.an('array');
  
        // Loop through each cart
        data.carrinhos.forEach((cart) => {
          // Check 'produtos' array
          expect(cart).to.have.property('produtos');
          expect(cart.produtos).to.be.an('array');
  
          // Loop through each product in the cart
          cart.produtos.forEach((produto) => {
            expect(produto).to.have.property('idProduto');
            expect(produto).to.have.property('precoUnitario');
            expect(produto).to.have.property('quantidade');
          });
  
          expect(cart).to.have.property('precoTotal');
          expect(cart.precoTotal).to.be.a('number');

          expect(cart).to.have.property('quantidadeTotal');
          expect(cart.quantidadeTotal).to.be.a('number');
  
          expect(cart).to.have.property('idUsuario');
          expect(cart.idUsuario).to.be.a('string');
          expect(cart).to.have.property('_id');
          expect(cart._id).to.be.a('string');
        });
      });
    });
  });
  