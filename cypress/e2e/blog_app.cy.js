describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Test",
      username: "test",
      password: "1234",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    const userSecond = {
      name: "Test Second",
      username: "testsecond",
      password: "1234",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userSecond);

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

  it("only the creator can see the delete button of a blog", function () {
    cy.login({ username: "test", password: "1234" });
    cy.createBlog({
      title: "Blog",
      author: "Author",
      url: "https://blogs.com/author",
    });
    cy.login({ username: "testsecond", password: "1234" });
    cy.contains("View").click();
    cy.get("html").should("not.contain", "Delete");
  });

  it(" the blogs are ordered according to likes", function () {
    cy.login({ username: "test", password: "1234" });
    cy.createBlog({
      title: "Blog One",
      author: "Author One",
      url: "https://blogs.com/authorone",
      likes: 5,
    });
    cy.createBlog({
      title: "Blog Two",
      author: "Author Two",
      url: "https://blogs.com/authortwo",
      likes: 11,
    });

    cy.createBlog({
      title: "Blog Three",
      author: "Author Three",
      url: "https://blogs.com/authorthree",
      likes: 7,
    });

    cy.get(".blog").eq(0).should("contain", "Blog Two Author Two");
    cy.get(".blog").eq(1).should("contain", "Blog Three Author Three");
    cy.get(".blog").eq(2).should("contain", "Blog One Author One");
  });
});
