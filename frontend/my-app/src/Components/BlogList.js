import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const BlogList = () =>{
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>{
        fetch(`/api/blogs?search=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.log("error searching" + error));
    },[searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
          <Navigation />
          <h1 className={styles.txt}>Blog List</h1>
          <div className={styles.form}>
          <input className={styles.ip} type="text" placeholder="Search by title" value={searchTerm} onChange={handleSearch} />
          <ul className={styles.fulllist}>
            {blogs.map((blog) => (
              <li className={styles.eachitem} key={blog._id}>
                <Link className={styles.lin} to={`/blogs/${blog._id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul> 
          </div>
        </div>
      );

};

export default BlogList;