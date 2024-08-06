import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArticleCard.css";

const ArticleCard = ({ article, isLarge }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const altText = `Image for the article titled "${truncateText(
    article.title,
    40
  )}" in the ${article.topic} topic`;

  return (
    <article className={`article-card ${isLarge ? "large-article-card" : ""}`}>
      <Link to={`/articles/${article.article_id}`} className="article-link">
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={altText}
            className="article-image"
          />
        )}
        <h2 className="article-title">{article.title}</h2>
        <p className="article-date">
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p className="article-topic">
          {"#" + capitalizeFirstLetter(article.topic)}
        </p>
      </Link>
    </article>
  );
};

export default ArticleCard;
