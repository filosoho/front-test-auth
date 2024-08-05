import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArticleCard.css";

const ArticleCard = ({ article, isLarge }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className={`article-card ${isLarge ? "large-article-card" : ""}`}>
      <Link to={`/articles/${article.article_id}`} className="article-link">
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-image"
          />
        )}
        <h2 className="article-title">{article.title}</h2>
        <p className="article-date">
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p className="article-topic">{capitalizeFirstLetter(article.topic)}</p>
      </Link>
    </div>
  );
};

export default ArticleCard;
