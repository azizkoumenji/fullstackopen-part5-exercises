import PropTypes from "prop-types";

const Add = ({
  addBlog,
  newAuthor,
  newTitle,
  newURL,
  handleAuthorChange,
  handleTitleChange,
  handleURLChange,
}) => {
  return (
    <>
    <h2>Create New</h2>
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        URL:
        <input value={newURL} onChange={handleURLChange} />
      </div>
      <button type="submit">save</button>
      </form>
      </>
  );
};

Add.propTypes = {
  newAuthor: PropTypes.string.isRequired,
  newTitle: PropTypes.string.isRequired,
  newURL: PropTypes.string.isRequired,
  addBlog: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleURLChange: PropTypes.func.isRequired,
};

export default Add;
