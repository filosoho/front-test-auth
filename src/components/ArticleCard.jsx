import React from "react";
import { Link } from "react-router-dom";
import { truncateText } from "../utils";
import "../styles/ArticleCard.css";

const ArticleCard = ({ article, isLarge }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const altText = `Image for the article titled "${truncateText(
    article.title,
    40
  )}" in the ${article.topic} topic`;

  return (
    <article className={`article-card ${isLarge ? "large-article-card" : ""}`}>
      <Link to={`/article/${article.article_id}`} className="article-link">
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={altText}
            className="article-image"
          />
        )}
        <h2 className="article-title">{article.title}</h2>
        <div className="content-card">
          <div>
            <p className="article-date">
              {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p className="article-topic">
              {"#" + capitalizeFirstLetter(article.topic)}
            </p>
          </div>
          <div className="comments-votes">
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
