import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../services/api";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import "../styles/ArticlesByTopicPage.css";

const ArticlesByTopicPage = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = topic ? { topic } : {};

    fetchArticles(params)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch articles.");
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <Loading />;

  return (
    <section className="articles-by-topic-page">
      <h1>{topic}</h1>
      <div className="articles-topic-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </div>
    </section>
  );
};

export default ArticlesByTopicPage;
