import PropTypes from "prop-types";
import { useState } from "react";

const Add = ({ addBlog }) => {
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  const newBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };
    addBlog(blogObject);
    setNewTitle("");
    setNewURL("");
    setNewAuthor("");
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={newBlog}>
        <div>
          Title:
          <input value={newTitle} id="title" onChange={handleTitleChange} />
        </div>
        <div>
          Author:
          <input value={newAuthor} id="author" onChange={handleAuthorChange} />
        </div>
        <div>
          URL:
          <input value={newURL} id="url" onChange={handleURLChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

Add.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default Add;
