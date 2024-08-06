import React, { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "./ArticleCard";
import "../styles/ArticlesList.css";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error("Error fetching articles: ", error);
      });
  }, []);

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
