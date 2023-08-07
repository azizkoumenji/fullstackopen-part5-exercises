describe("template spec", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Test",
      username: "test",
      password: "1234",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("the application displays the login form by default", function () {
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(0, 0, 0)");

      cy.get("html").should("not.contain", "Test logged in");
    });
  });
});
