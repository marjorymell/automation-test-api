describe('Create Cart API Testing', () => {
    beforeEach(() => {
        cy.fixture('credentials').as('userData').then((userData) => {
          cy.login(userData.validUserNotAdmin.email, userData.validUserNotAdmin.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token); 
          });
        });
    });

    it('POST cart with successs', function() {
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

        cy.cancelCart().then((cancelResponse) => {
            // Check if the cancel cart request was successful
            expect(cancelResponse.status).to.eq(200);
            expect(cancelResponse.body).to.have.property('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido');
        });
    });

    it('POST cart with duplicate product error', function() {
        const cartData = {
            produtos: [
                {
                  idProduto: 'dWAtwkc2I3nReI57',
                  quantidade: 1
                },
                {
                  idProduto: 'dWAtwkc2I3nReI57',
                  quantidade: 1
                }
              ]
            };
      
        cy.createCart(cartData).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', 'Não é permitido possuir produto duplicado');
            expect(response.body).to.have.property('idProdutosDuplicados');
        });
    });

    it('POST cart with not admin user error', function() {
        // Log in user with cart already registered
        cy.fixture('credentials').as('userData').then((userData) => {
          cy.login(userData.validUser.email, userData.validUser.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token);
          });
        });
    
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
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property('message', 'Não é permitido ter mais de 1 carrinho');
        });
    });

    it('POST cart with product not found error', function() {
        const cartData = {
            produtos: [
                {
                  idProduto: 'invalidId',
                  quantidade: 1
                },
                {
                  idProduto: 'J1zV2I3plPDLmoCM',
                  quantidade: 1
                }
            ]
        };
      
        cy.createCart(cartData).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', 'Produto não encontrado');
            expect(response.body).to.have.property('item');
            expect(response.body.item).to.have.property('idProduto');
            expect(response.body.item).to.have.property('quantidade');
            expect(response.body.item).to.have.property('index'); 
        });
    });

    it('POST cart with sufficient quantity error', function() {
        const cartData = {
            produtos: [
                {
                  idProduto: 'dWAtwkc2I3nReI57',
                  quantidade: 500 // Quantity higher than stock
                },
                {
                  idProduto: 'J1zV2I3plPDLmoCM',
                  quantidade: 1
                }
            ]
        };
      
        cy.createCart(cartData).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', 'Produto não possui quantidade suficiente');
            expect(response.body).to.have.property('item');
            expect(response.body.item).to.have.property('idProduto');
            expect(response.body.item).to.have.property('quantidade');
            expect(response.body.item).to.have.property('quantidadeEstoque'); 
            expect(response.body.item).to.have.property('index'); 
        });
    });

    it('POST cart with invalid token error', function() {
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

        // Removes the token to simulate lack of authentication
        Cypress.env('token', null);
    
        cy.createCart(cartData).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
      });
})