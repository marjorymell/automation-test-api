describe('Edit User API Testing', () => {
    it('CREATE user via PUT/PATCH method', function() {
        cy.generateUniqueEmail().then((uniqueEmail) => {
            const newUserData = {
                nome: "New User",
                email: uniqueEmail,
                password: "password123",
                administrador: "true"
            };

            cy.editUser(null, newUserData).then((response) => {
                expect(response.status).to.eq(201); 
                expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
                expect(response.body).to.have.property('_id');
            });
        });
    });

    it('EDIT user with valid ID', function() {
        cy.generateUniqueEmail().then((uniqueEmail) => {
            const newUser = {
                nome: "Mel",
                email: uniqueEmail,
                password: "teste123",
                administrador: "true"
            };

            // Create the user
            cy.createUser(newUser).then((response) => {
                const userId = response.body._id;

                cy.generateUniqueEmail().then((updatedEmail) => {
                    const updatedUserData = {
                        nome: "Mel Updated",
                        email: updatedEmail,
                        password: "teste123",
                        administrador: "false"
                    };

                    // Edit the user with the obtained ID
                    cy.editUser(userId, updatedUserData).then((editResponse) => {
                        expect(editResponse.status).to.eq(200);
                        expect(editResponse.body).to.have.property('message', 'Registro alterado com sucesso');
                    });
                });
            });
        });
    });

    it('EDIT user with existing email', function() {
        const userId = Cypress.env('userId'); 
        const updatedUserData = {
            nome: "Mel Updated",
            email: "fulano@qa.com", 
            password: "teste123",
            administrador: "false"
        };

        cy.editUser(userId, updatedUserData).then((response) => {
            expect(response.status).to.eq(400); 
            expect(response.body).to.have.property('message', 'Este email já está sendo usado');
        });
    });
});
