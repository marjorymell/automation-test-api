<div align="center">
  <h1> Automation Test API </h1>
</div>

This project aims to automate the tests of the REST API [Serverest](https://serverest.dev), which simulates an e-commerce platform. The API includes endpoints for managing users, products, and carts.

## :arrow_right: Endpoints

- **/login**: Logs in a user.
- **/users**: Allows CRUD (Create, Read, Update, Delete) operations for users.
- **/products**: Allows CRUD operations for products.
- **/carts**: Allows CRUD operations for carts (except for the PUT method).

## :cd: Installation

1. Ensure you have [Node.js](https://nodejs.org/) **^20.11.1** installed on your system.
2. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/marjorymell/automation-test-api
   
3. Open the terminal and run `npm install` to install all necessary dependencies.  
4. After successful installation, run `npx cypress open` to start the tests.

## :computer: Technologies Used

This project utilizes the following technologies and dependencies:

- **Cypress ^13.14.1**: For test automation.
- **Cypress-Plugin-Api ^2.11.2**: To facilitate API testing.
- **Eslint-Plugin-Cypress ^3.5.0**: To ensure code quality.

## :spiral_notepad: Project Structure

- **cypress/**: Contains tests and configurations for Cypress.
  - **cypress/e2e/auth/**: Tests related to authentication.
  - **cypress/e2e/users/**: Tests related to user management.
  - **cypress/e2e/products/**: Tests related to product management.
  - **cypress/e2e/carts/**: Tests related to cart management.
- **cypress/plugins/**: Cypress plugins.
- **cypress/fixtures/**: Project test data.
- **cypress/support/**: Support files and configuration for Cypress.

## :mailbox_with_mail: Contact

To report bugs or request new features, please use the Issues section of the repository on GitHub. This helps maintain a record of issues and facilitates collaboration.

If you have any questions, suggestions, or need help with the project, feel free to reach out. Here are some ways to contact me:

- **Name**: Marjory Mel Ferreira Ferro Lemos
- **Email**: [marjorymel48@gmail.com](mailto:marjorymel48l@gmail.com)
- **LinkedIn**: [Marjory Lemos](www.linkedin.com/in/marjorymell)

#
