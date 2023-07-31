import PropTypes from "prop-types";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user }) => {
  const [showAll, setShow] = useState(false);

  const handleClick = () => {
    const change = !showAll;
    setShow(change);
  };

  const handleLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.modify(newBlog);
    setBlogs(await blogService.getAll());
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDeleteButton = user.id === blog.user.id;

  const handelDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog);
      setBlogs(await blogService.getAll());
    }
  };

  if (showAll) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} {blog.author}
        </p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <p>
          Likes: {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={handleClick}>Hide</button>{" "}
        {showDeleteButton && <button onClick={handelDelete}>Delete</button>}
      </div>
    );
  } else {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>View</button>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Blog;
