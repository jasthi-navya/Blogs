import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styles from '../Styling/BlogList.module.css';
import style from '../Styling/Home.module.css';


const Navigation = () => (
  <nav>
    <ul className={style.container}>
      <li className={style.btn}>
        <Link className={style.lin} to="/new-Blog">New Blog</Link>
      </li>
      <li className={style.btn}>
        <Link className={style.lin} to="/blog-list">Blog List</Link>
      </li>
      <li className={style.btn}>
        <Link className={style.lin} to="/news-page">News</Link>
      </li>
      <li className={style.btn}>
        <Link className={style.lin} to="/log-out">Log Out</Link>
      </li>
      <li className={style.btn}>
        <Link className={style.lin} to="/myblogs">My Blogs</Link>
      </li>
    </ul>
  </nav>
);

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    // Fetch blogs for the logged-in user
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/my-blogs', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.blogs);
        } else {
          console.error('Error fetching blogs');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  if(!blogs || blogs.length === 0){
    return <div>Loading....</div>;
  }

  return (
    <div>
      <Navigation />
      <h2 className={styles.txt}>My Blogs</h2>
          <ul className={styles.fulllist}>
            {blogs.map((blog) => (
              <li className={styles.eachitem} key={blog._id}>
                <Link className={styles.lin} to={`/blogs/${blog._id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
    </div>
  );
}

export default MyBlogs;
