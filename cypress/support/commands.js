Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  const likesResult = likes ? likes : 0;
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author, url, likes: likesResult },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });

  cy.visit("");
});
