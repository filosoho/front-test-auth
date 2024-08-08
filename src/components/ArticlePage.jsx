import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { truncateText } from "../utils";
import CommentsSection from "./CommentsSection";
import Loading from "./Loading";
import Voting from "./Voting";
import { BadRequestPage, NotFoundArticle } from "./ErrorsComponent.jsx";
import "../styles/ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchArticleById(articleId)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          if (error.response.status === 404) {
            setError("Article not found");
          } else if (error.response.status === 400) {
            setError("Bad request");
          } else {
            setError("An unexpected error occurred");
          }
        } else {
          setError("Network error");
        }
      });
  }, [articleId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    if (error === "Article not found") {
      return <NotFoundArticle />;
    } else if (error === "Bad request") {
      return <BadRequestPage />;
    } else {
      return <div className="error-page">Error: {error}</div>;
    }
  }

  if (!article) {
    return <NotFoundArticle />;
  }

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
      <article className="voting-article">
        <div className="article-page article-content">
          <div className="icon-votes-box">
            <Voting articleId={articleId} initialVotes={article.votes} />
          </div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-author">By {article.author}</p>
          <p className="article-date">
            {new Date(article.created_at).toLocaleDateString()}
          </p>
          <article className="article-body">{article.body}</article>
        </div>
      </article>
      <CommentsSection articleId={articleId} user={loggedInUser} />
    </section>
  );
};

export default ArticlePage;
