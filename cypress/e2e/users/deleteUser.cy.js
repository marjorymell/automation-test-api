describe('Delete User API Testing', () => {
    let creds;

    before(() => {
        cy.fixture('credentials').then((data) => {
            creds = data; // Armazena os dados da fixture em uma variável
        });

        // Create a user before running the deletion tests
        cy.generateUniqueEmail().then((uniqueEmail) => {
            const newUser = {
                nome: "Mel",
                email: uniqueEmail,
                password: "teste123",
                administrador: "true"
            };

            cy.createUser(newUser).then((response) => {
                Cypress.env('userId', response.body._id);
            });
        });
    });

    it('DELETE user by ID', function() {
        const userId = Cypress.env('userId');
        cy.deleteUser(userId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        });
    });

    it('DELETE user with invalid id', function() {
        const invalidUserId = creds.userIds.invalidUserId; 

        cy.deleteUser(invalidUserId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Nenhum registro excluído');
        });
    });
});
