import React, { useContext } from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { TopicNotFound } from "./ErrorsComponent";
import ArticleCard from "./ArticleCard";
import "../styles/ArticlesByTopicPage.css";

const ArticlesByTopicPage = () => {
  const { allArticles } = useContext(ArticlesContext);
  const { topic } = useParams();

  const filteredArticles = topic
    ? allArticles.filter((article) => article.topic === topic)
    : allArticles;

  if (!allArticles || allArticles.length === 0) {
    return <Loading />;
  }

  if (topic && filteredArticles.length === 0) {
    return <TopicNotFound />;
  }

  return (
    <section className="container articles-by-topic-page">
      <h1>{topic}</h1>
      <div className="articles-topic-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
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
