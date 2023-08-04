import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Add from "./Add";

test("the form calls the event handler", async () => {
  const user = userEvent.setup();
  const addBlog = jest.fn();

  render(<Add addBlog={addBlog} />);
  const button = screen.getByText("Save");
  await user.click(button);
  expect(addBlog.mock.calls).toHaveLength(1);
});
