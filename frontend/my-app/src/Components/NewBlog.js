import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from '../Styling/NewBlog.module.css';
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

const NewBlog = () =>{
        const [title,setTitle] = useState('');
        const [content, setContent] = useState('');
        const [name, setName] = useState('');

        const handleTitleChange = (event) =>{
            setTitle(event.target.value); 
        };

        const handleContentChange = (event) =>{
            setContent(event.target.value); 
        };

        const handleNameChange = (event) =>{
            setName(event.target.value); 
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
              const token = localStorage.getItem('token'); 
              const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, name }),
              });
        
              if (response.ok) {
                console.log('Note saved successfully');
                setTitle('');
                setContent('');
                setName('');
              } else {
                console.error('Error saving note');
              }
            } catch (error) {
              console.error(error);
            }
        };

        return (
            <div>
              <Navigation />
              <div>
                <h1 className={styles.txt}> Create Blog </h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.sidehead} htmlFor="title">Title:</label>
                        <input className={styles.ip} type="text" id="title" value={title} onChange={handleTitleChange} />
                    </div>
                    <div>
                        <label className={styles.sidehead} htmlFor="content">Content:</label>
                        <textarea className={styles.ip} id="content" value={content} onChange={handleContentChange}></textarea>
                    </div>
                    <div>
                        <label className={styles.sidehead} htmlFor="name">Name:</label>
                        <textarea className={styles.ip} id="name" value={name} onChange={handleNameChange}></textarea>
                    </div>
                    <button className={styles.btn} type="submit">Submit</button>
                </form>
                </div>
            </div>
        );
};

export default NewBlog;