describe('Get User by ID API Testing', () => {
    beforeEach(() => {
      cy.fixture('credentials').as('creds');
    });
  
    it('GET user by valid ID', function() {
      const validUserId = this.creds.validUser.id; 
  
      cy.getUserById(validUserId).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('nome'); 
        expect(response.body).to.have.property('email'); 
        expect(response.body).to.have.property('_id'); 
      });
    });
  
    it('GET user by invalid ID', function() {
      const invalidUserId = this.creds.userIds.invalidUserId; 
  
      cy.getUserById(invalidUserId).then((response) => {
        expect(response.status).to.eq(400); 
        expect(response.body).to.have.property('message', 'Usuário não encontrado');
      });
    });
  });
  