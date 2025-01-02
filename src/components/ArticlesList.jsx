import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import caretRightImg from "../assets/caret-right.svg";
import "../styles/ArticlesList.css";

const ArticlesList = ({ articles }) => {
  const [largeArticle, ...restArticles] = articles;
  const [selectedTopic, setSelectedTopic] = useState("coding");

  const sidePopularArticles = [...articles]
    .sort((a, b) => b.comment_count - a.comment_count)
    .slice(0, 4);
  const sideTrendyArticles = [...articles]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 4);

  const uniqueTopics = [...new Set(articles.map((article) => article.topic))];

  const sideTopicArticles = [...articles]
    .filter((article) => article.topic === selectedTopic)
    .sort((a, b) => b.comment_count - a.comment_count)
    .slice(0, 5);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const textArticles = restArticles.slice(0, 6);
  const subArticles = restArticles.slice(6, 9);
  const textSubArticles = restArticles.slice(9, 15);
  const largeSecondArticle = restArticles.slice(15, 17);

  return (
    <section className="articles-list">
      <article className="left-column">
        {largeArticle && (
          <article className="large-article">
            <ArticleCard article={largeArticle} isLarge />
          </article>
        )}
        <article className="text-articles">
          {textArticles.map((article) => (
            <div key={article.article_id}>
              <img src={caretRightImg} alt="caret-right" />
              <ArticleCard
                key={article.article_id}
                article={article}
                isTextOnly
              />
            </div>
          ))}
        </article>
        <article className="sub-articles">
          {subArticles.map((article) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              isSubArticles
            />
          ))}
        </article>
        <article className="textsub-articles">
          {textSubArticles.map((article) => (
            <ArticleCard key={article.article_id} article={article} isTextSub />
          ))}
        </article>
        {largeSecondArticle && (
          <article className="second-large-article">
            {largeSecondArticle.map((article) => (
              <ArticleCard
                key={article.article_id}
                article={article}
                isSecondLarge
              />
            ))}
          </article>
        )}
      </article>
      <article className="right-column">
        <article className="side-articles">
          <div className="topic-list">
            {uniqueTopics.map((topic) => (
              <p
                className={`article-sidebar-topic topic-name ${
                  selectedTopic === topic ? "active-topic" : ""
                }`}
                key={topic}
                onClick={() => handleTopicClick(topic)}
              >
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </p>
            ))}
          </div>
          {sideTopicArticles.map((article, index) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              customNum={String(index + 1).padStart(2, "0")}
              isSidebar
            />
          ))}
        </article>
        <article className="side-topics-articles">
          {sidePopularArticles.map((article, index) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              customNum={String(index + 1).padStart(2, "0")}
              isSidebarPopular
            />
          ))}
        </article>
        <article className="side-trendy-articles">
          {sideTrendyArticles.map((article, index) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              customNum={String(index + 1).padStart(2, "0")}
              isSidebarTrendy
            />
          ))}
        </article>
      </article>
    </section>
  );
};

export default ArticlesList;
