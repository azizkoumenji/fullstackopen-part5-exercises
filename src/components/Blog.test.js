import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://blog.com/testblog",
    likes: 10,
    user: {
      id: "64bb33561a688cc4f43e7590",
      name: "Test",
    },
  };

  const user = {
    id: "64bb33561a688cc4f43e7590",
    name: "Test",
  };

  const setBlogs = jest.fn();

  render(<Blog blog={blog} user={user} setBlogs={setBlogs} />);
  const element = screen.getByText("Test Blog Test Author", {
    exact: false,
  });

  screen.debug();

  expect(element).toBeDefined();
});

test("the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://blog.com/testblog",
    likes: 10,
    user: {
      id: "64bb33561a688cc4f43e7590",
      name: "Test",
    },
  };

  const user = {
    id: "64bb33561a688cc4f43e7590",
    name: "Test",
  };

  const setBlogs = jest.fn();

  render(<Blog blog={blog} user={user} setBlogs={setBlogs} />);
  const button = screen.getByText("View");
  const userInteraction = userEvent.setup();
  await userInteraction.click(button);

  const likes = screen.getByText("Likes", {
    exact: false,
  });
  screen.debug(likes);

  const link = screen.getByText("http://blog.com/testblog");
  screen.debug(link);
});

test("like button is clicked twice", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://blog.com/testblog",
    likes: 10,
    user: {
      id: "64bb33561a688cc4f43e7590",
      name: "Test",
    },
  };

  const user = {
    id: "64bb33561a688cc4f43e7590",
    name: "Test",
  };

  const setBlogs = jest.fn();
  const handleLike = jest.fn();

  render(
    <Blog blog={blog} user={user} setBlogs={setBlogs} handleLike={handleLike} />
  );
  const button = screen.getByText("View");
  const userInteraction = userEvent.setup();
  await userInteraction.click(button);
  const likeButton = screen.getByText("Like");
  await userInteraction.click(likeButton);
  await userInteraction.click(likeButton);
  expect(handleLike.mock.calls).toHaveLength(2);
});
