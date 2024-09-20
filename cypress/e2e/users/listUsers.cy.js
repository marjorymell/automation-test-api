describe('User Listing API Testing', () => {
  it('GET all users', () => {
    cy.listUsers().then((data) => {
      expect(data).to.have.property('quantidade'); 
      expect(data.quantidade).to.be.greaterThan(0); 
      expect(data).to.have.property('usuarios'); 
      expect(data.usuarios).to.be.an('array');
      expect(data.usuarios[0]).to.have.property('nome');
      expect(data.usuarios[0]).to.have.property('email'); 
      expect(data.usuarios[0]).to.have.property('administrador');
    });
  });
});
  