import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [showAll, setShow] = useState(false);

  const handleClick = () => {
    const change = !showAll;
    setShow(change);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
          Likes: {blog.likes} <button>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={handleClick}>Hide</button>
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
};

export default Blog;
