import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../services/api";
import Lottie from "lottie-react";
import loadingHand from "../assets/animations/loading-animation3.json";
import error404Image from "../assets/Oops! 404 Error with a broken robot-cuate.svg";
import "../styles/ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(articleId)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      });
  }, [articleId]);

  if (isLoading) {
    return (
      <section className="home-page">
        <article className="lottie">
          <Lottie className="lottie" animationData={loadingHand} loop={true} />
        </article>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="error-404-section">
        <img
          src={error404Image}
          alt="Oops! 404 Error with a broken robot-cuate"
          className="error-404-image"
        />
        <h3>Article Not Found</h3>
      </section>
      // <a href="https://storyset.com/internet">Internet illustrations by Storyset</a>
    );
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const altText = `Image for the article titled "${truncateText(
    article.title,
    40
  )}"`;

  return (
    <section className="article-page">
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={altText}
          className="article-image"
        />
      )}
      <h1 className="article-title">{article.title}</h1>
      <p className="article-author">By {article.author}</p>
      <p className="article-date">
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <article className="article-body">{article.body}</article>
    </section>
  );
};

export default ArticlePage;
