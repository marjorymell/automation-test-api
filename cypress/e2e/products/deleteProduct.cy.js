describe('Product Deleting API Testing', () => {
    let productsData;
    beforeEach(() => {
      cy.fixture('credentials').as('userData').then((userData) => {
        cy.login(userData.validUser.email, userData.validUser.password).then((response) => {
          const token = response.body.authorization;
          Cypress.env('token', token); 
        });
      });

      cy.fixture('product').then((data) => {
        productsData = data; 
        });

        // Create a product before running the deletion tests
        cy.generateRandomProductName().then((randomProductName) => {
            const newProduct = {
                nome: randomProductName,
                preco: 100, 
                descricao: 'Descrição do Produto',
                quantidade: 1
              };

            cy.createProduct(newProduct).then((response) => {
                Cypress.env('productId', response.body._id);
            });
        });
    });
    
      it('DELETE product with successs', function() {
        const productId = Cypress.env('productId');
          cy.deleteProduct(productId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
          });
      });

      it('DELETE product with invalid id', function() {
        const invalidProductId = productsData.productIds.invalidProductId; 
        cy.deleteUser(invalidProductId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Nenhum registro excluído');
        });
    });
    it('DELETE product with invalid token error', function() {
        const productId = Cypress.env('productId');
 
        Cypress.env('token', null);
    
        cy.deleteProduct(productId).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });

    it('POST product with not admin user error', function() {
        // Log in as a non-administrator user
        cy.fixture('credentials').as('userData').then((userData) => {
          cy.login(userData.validUserNotAdmin.email, userData.validUserNotAdmin.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token);
          });
        });

        const productId = Cypress.env('productId');

        cy.deleteProduct(productId).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).to.have.property('message', 'Rota exclusiva para administradores');
        });
      });
  });