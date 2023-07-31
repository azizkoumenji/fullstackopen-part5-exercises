import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Add from "./components/Add";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await blogService.create(blogObject);
    setBlogs(await blogService.getAll());
    setMessage(`A new blog "${blogObject.title}" by ${blogObject.author} has been added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <>
        <Notification message={message} />
        <Login
          username={username}
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={message} />
        <p>{user.name} is logged in.</p>
        <button onClick={handleLogout}>Log Out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <Add
            addBlog={addBlog}
          />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
        ))}
      </div>
    );
  }
};

export default App;
