describe("Blog app", () => {
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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "1234" });
    });

    it("a new blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("A blog created by cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://blogs.com/cypress");
      cy.contains("Save").click();
      cy.contains("A blog created by cypress");
    });

    it("user can like a blog", function () {
      cy.createBlog({
        title: "Blog",
        author: "Author",
        url: "https://blogs.com/author",
      });
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.contains("1");
    });

    it("user can delete a blog", function () {
      cy.createBlog({
        title: "Blog",
        author: "Author",
        url: "https://blogs.com/author",
      });
      cy.contains("View").click();
      cy.contains("Delete").click();
      cy.get("html").should("not.contain", "Blog Author");
    });
  });
});
