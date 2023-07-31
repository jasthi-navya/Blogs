import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/home';
import Newblog from './Components/NewBlog';
import BlogList from './Components/BlogList';
import BlogDetails from './Components/BlogDetails';
import NewsPage from './Components/NewsPage';
import Logout from './Components/LogOut';
import MyBlogs from './Components/MyBlogs';
import styles from './Styling/Main.module.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-Blog" element={<Newblog />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/news-page" element={<NewsPage />} />
          <Route path="/log-out" element={<Logout />} />
          <Route path="/myblogs" element={<MyBlogs />} />
        </Routes>
      </div>
    </Router>
  );
};

const OpeningPage = () => {
  const [showSignup, setShowSignup] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  const handleSignup = () => {
    setShowSignup(false);
    return <Navigate to="/signup" />;
  };

  const handleLogin = () => {
    setShowLogin(false);
    return <Navigate to="/login" />;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.txt}>Blogs Website</h2>
      {showSignup ? (
        <div>
          <button className={styles.btn} onClick={handleSignup}>Signup</button>
        </div>
      ) : (
        <Navigate to="/signup" replace />
      )}
      {showLogin ? (
        <div>
          <button className={styles.btn} onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

const SignUpPage = () => {
  return (
    <div>
      <SignUp />
    </div>
  );
};

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
