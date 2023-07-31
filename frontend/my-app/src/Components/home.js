import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from '../Styling/Home.module.css';

const Navigation = () => (
    <nav>
      <ul className={styles.container}>
        <li className={styles.btn}>
          <Link className={styles.lin} to="/new-Blog">New Blog</Link>
        </li>
        <li className={styles.btn}>
          <Link className={styles.lin} to="/blog-list">Blog List</Link>
        </li>
        <li className={styles.btn}>
          <Link className={styles.lin} to="/news-page">News</Link>
        </li>
        <li className={styles.btn}>
          <Link className={styles.lin} to="/log-out">Log Out</Link>
        </li>
        <li className={styles.btn}>
          <Link className={styles.lin} to="/myblogs">My Blogs</Link>
        </li>
      </ul>
    </nav>
);

const home = () =>{
    return (
          <div>
            <Navigation />
          </div>
      );
    };

export default home;