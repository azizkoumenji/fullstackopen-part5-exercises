describe("template spec", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");
  });

  it("the application displays the login form by default", function () {
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
  });
});
