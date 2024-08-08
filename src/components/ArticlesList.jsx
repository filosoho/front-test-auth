import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import "../styles/ArticlesList.css";

const ArticlesList = ({ articles }) => {
  const [largeArticle, ...otherArticles] = articles;

  return (
    <section className="articles-list">
      {largeArticle && (
        <article className="large-article">
          <ArticleCard article={largeArticle} isLarge />
        </article>
      )}
      <article className="grid-articles">
        {otherArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </article>
    </section>
  );
};

export default ArticlesList;
