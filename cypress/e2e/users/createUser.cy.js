describe('Create User API Testing', () => {
    beforeEach(() => {
      cy.fixture('credentials').as('userData');
    });
  
    it('POST new user with success', function() {
      cy.generateUniqueEmail().then((uniqueEmail) => {
        const newUser = {
          nome: "Mel",
          email: uniqueEmail,
          password: "teste123",
          administrador: "true"
        };
          cy.createUser(newUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
            expect(response.body).to.have.property('_id');
        });
      });
    });
  
    it('POST user with validUser email should return error', function() {
      const existingUser = {
        nome: "User Invalid Test",
        email: this.userData.validUser.email,
        password: "teste123",
        administrador: "true"
      };
  
      cy.createUser(existingUser).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Este email já está sendo usado');
      });
    });
  });
  