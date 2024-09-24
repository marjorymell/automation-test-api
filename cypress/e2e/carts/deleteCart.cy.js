describe('Delete Cart API Testing', () => {
    beforeEach(() => {
        cy.fixture('credentials').as('userData').then((userData) => {
          cy.login(userData.validUserNotAdmin.email, userData.validUserNotAdmin.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token); 
          });
        });
    });

    it('DELETE cart with successs', function() {
        const cartData = {
            produtos: [
                {
                  idProduto: 'dWAtwkc2I3nReI57',
                  quantidade: 1
                },
                {
                  idProduto: 'J1zV2I3plPDLmoCM',
                  quantidade: 1
                }
              ]
            };
      
        cy.createCart(cartData).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
            expect(response.body).to.have.property('_id');
        });

        cy.deleteCart().then((cancelResponse) => {
            expect(cancelResponse.status).to.eq(200);
            expect(cancelResponse.body).to.have.property('message', 'Registro excluído com sucesso');
        });
    });

    it('DELETE cart for user without', function() {
    cy.fixture('credentials').as('userData').then((userData) => {
        cy.login(userData.validUser.email, userData.validUser.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token);
        });
    });

        cy.deleteCart().then((cancelResponse) => {
            expect(cancelResponse.status).to.eq(200);
            expect(cancelResponse.body).to.have.property('message', 'Não foi encontrado carrinho para esse usuário');
        });
    });

    it('DELETE cart with invalid token error', function() {
        const cartId = Cypress.env('cartId');
        Cypress.env('token', null);

        cy.deleteCart(cartId).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });
});