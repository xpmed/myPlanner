import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegNewspaper } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API key for NewsAPI
  const API_KEY = 'f7d70b9d59f04614bb2efe18e225a812';
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  // Fetch news articles when the component mounts
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch news');
        setLoading(false);
        toast.error('Error fetching news!');
      });
  }, []);

  return (
    <div className="news-container">
      <h1 className="news-title">
        <FaRegNewspaper style={{ marginRight: '10px' }} />
        Najnowsze wiadomości
      </h1>

      {loading ? (
        <div className="loader">
          <Bars height="100" width="100" color="#4fa94d" />
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="news-list">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                alt={article.title}
                className="news-image"
              />
              <div className="news-content">
                <h2 className="news-heading">{article.title}</h2>
                <p className="news-description">{article.description}</p>

                {/* Link opens the article in a new tab */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Czytaj więcej
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default News;
