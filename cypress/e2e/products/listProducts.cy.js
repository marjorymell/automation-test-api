describe('Product Listing API Testing', () => {
    it('GET all products', () => {
        cy.listProducts().then((data) => {
            expect(data).to.have.property('quantidade'); 
            expect(data.quantidade).to.be.greaterThan(0); 
            expect(data).to.have.property('produtos'); 
            expect(data.produtos).to.be.an('array');
            expect(data.produtos[0]).to.have.property('nome');
            expect(data.produtos[0]).to.have.property('preco'); 
            expect(data.produtos[0]).to.have.property('descricao');
            expect(data.produtos[0]).to.have.property('quantidade');
            expect(data.produtos[0]).to.have.property('_id');
        });
    });
});
