describe('Product Creation API Testing', () => {
    beforeEach(() => {
      cy.fixture('credentials').as('userData').then((userData) => {
        cy.login(userData.validUser.email, userData.validUser.password).then((response) => {
          const token = response.body.authorization;
          Cypress.env('token', token); 
        });
      });
      cy.fixture('product').as('productData');
    });
    
      it('POST product with successs', function() {
        cy.generateRandomProductName().then((randomProductName) => {
            const productData = {
                nome: randomProductName,
                preco: 100, 
                descricao: 'Descrição do produto',
                quantidade: 1
              };
      
          cy.createProduct(productData).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
            expect(response.body).to.have.property('_id');
          });
        });
      });
  
    it('POST product with duplicate product error', function() {
      cy.createProduct(this.productData.validProduct).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Já existe produto com esse nome');
      });
    });

    it('POST product with invalid token error', function() {
      const productData = {
        nome: 'Produto Teste',
        preco: 100,
        descricao: 'Descrição Teste',
        quantidade: 1
      };
  
      // Removes the token to simulate lack of authentication
      Cypress.env('token', null);
  
      cy.createProduct(productData).then((response) => {
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
  
      const productData = {
        nome: 'Produto Teste',
        preco: 100,
        descricao: 'Descrição de Teste',
        quantidade: 1
      };
  
      cy.createProduct(productData).then((response) => {
        expect(response.status).to.eq(403);
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores');
      });
    });
  });