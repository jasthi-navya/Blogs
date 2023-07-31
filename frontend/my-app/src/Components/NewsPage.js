import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import style from '../Styling/Home.module.css';
import styles from '../Styling/NewsPage.module.css';

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

const NewsPage = () => {

    const [news, setNews] = useState([]);
    useEffect(() =>{
        const fetchNews = async () =>{
            try{
                const response = await fetch(`https://gnews.io/api/v4/search?q=placements+jobs&token=30b6e0c46ec90055e574ce9a01a2d122`);
                const data = await response.json();
                setNews(data.articles);
            }
            catch(error){
                console.error('Error fetching news: ',error);
            }
        };
        fetchNews();
    },[]);

    return(
        <div>
            <Navigation />
            <h1 className={styles.head} >Latest News on Placements and Jobs</h1>
            <ul className={styles.fulllist}>
                {news.map((article)=>(
                    <li className={styles.list} key={article.title}>
                        <a className={styles.lin} href={article.url} target = "_blank" rel = "noopener noreferrer">{article.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsPage;