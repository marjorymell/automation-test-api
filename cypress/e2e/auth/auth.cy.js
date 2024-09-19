describe('Auth API Testing', () => {
  beforeEach(() => {
    // Load login data from fixture
    cy.fixture('credentials').as('creds');
  });

  it('POST credentials to auth endpoint with success', () => {  
    cy.get('@creds').then((creds) => {
      cy.login(creds.validUser.email, creds.validUser.password)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.authorization).to.be.a('string');
          expect(response.body).to.have.property('message').and.to.equal('Login realizado com sucesso');
        });
    });
  });

  it('POST credentials to auth endpoint with invalid user', () => {
    cy.get('@creds').then((creds) => {
      cy.login(creds.invalidUser.email, creds.invalidUser.password)
        .then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property('message').and.to.equal('Email e/ou senha inválidos');
        });
    });
  });
});
