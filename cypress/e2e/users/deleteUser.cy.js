describe('Delete User API Testing', () => {
    before(() => {
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

        if (userId) {
            cy.deleteUser(userId).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
            });
        } else {
            throw new Error('User ID is not defined');
        }
    });
});
