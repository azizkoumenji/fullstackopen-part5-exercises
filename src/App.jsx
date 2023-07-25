import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    blogService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  }

  if (user === null) {
    return (
      <Login username={username} handleLogin={handleLogin} password={password} setPassword={setPassword} setUsername={setUsername} />
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} is logged in.</p>
        <button onClick={handleLogout}>Logout</button>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
