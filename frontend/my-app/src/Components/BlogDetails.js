import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from '../Styling/BlogDetails.module.css';
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


const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />
      <h2 className={styles.head}>{blog.title}</h2>
      <p className={styles.para}>{blog.content}</p>
      <p className={styles.para}>{blog.name}</p>
    </div>
  );
};

export default BlogDetails;
