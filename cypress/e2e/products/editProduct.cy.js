describe('Edit Product API Testing', () => {
    beforeEach(() => {
        cy.fixture('credentials').as('userData').then((userData) => {
          cy.login(userData.validUser.email, userData.validUser.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token); 
          });
        });
        cy.fixture('product').as('productData');
    });

    it('CREATE product via PUT/PATCH method', function() {
        cy.generateRandomProductName().then((randomProductName) => {
            const newProduct = {
                nome: randomProductName,
                preco: 100, 
                descricao: 'Descrição do produto',
                quantidade: 1
            };

            cy.editProduct(null, newProduct).then((response) => {
                expect(response.status).to.eq(201); 
                expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
                expect(response.body).to.have.property('_id');
            });
        });
    });

    it('EDIT product with valid ID', function() {
        cy.generateRandomProductName().then((randomProductName) => {
            const newProduct = {
                nome: randomProductName,
                preco: 100, 
                descricao: 'Descrição do produto',
                quantidade: 1
            };

            // Create the product
            cy.createProduct(newProduct).then((response) => {
                const productId = response.body._id;

                cy.generateRandomProductName().then((randomProductName) => {
                    const updateProductData = {
                        nome: randomProductName,
                        preco: 100, 
                        descricao: 'Descrição do produto',
                        quantidade: 1
                    };

                    // Edit the product with the obtained ID
                    cy.editProduct(productId, updateProductData).then((editResponse) => {
                        expect(editResponse.status).to.eq(200);
                        expect(editResponse.body).to.have.property('message', 'Registro alterado com sucesso');
                    });
                });
            });
        });
    });

    it('EDIT product with existing name', function() {
        const productId = Cypress.env('productId'); 
        const updatedProductData = {
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
        };

        cy.editProduct(productId, updatedProductData).then((response) => {
            expect(response.status).to.eq(400); 
            expect(response.body).to.have.property('message', 'Já existe produto com esse nome');
        });
    });

    it('EDIT product with invalid token error', function() {
        const productData = {
          nome: 'Produto Teste',
          preco: 100,
          descricao: 'Descrição Teste',
          quantidade: 1
        };
    
        // Removes the token to simulate lack of authentication
        Cypress.env('token', null);
    
        cy.editProduct(productData).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
      });
  
      it('EDIT product with not admin user error', function() {
        // Log in as a non-administrator user
        cy.fixture('credentials').as('userData').then((userData) => {
          cy.login(userData.validUserNotAdmin.email, userData.validUserNotAdmin.password).then((response) => {
            const token = response.body.authorization;
            Cypress.env('token', token);
          });
        });
    
        const productData = {
          nome: 'Produto Teste',
          preco: 100,
          descricao: 'Descrição de Teste',
          quantidade: 1
        };
    
        cy.editProduct(productData).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).to.have.property('message', 'Rota exclusiva para administradores');
        });
      });
});
