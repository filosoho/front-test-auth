import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, voteOnArticle } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { truncateText } from "../utils";
import CommentsSection from "./CommentsSection";
import Loading from "./Loading";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";
import error404Image from "../assets/Oops! 404 Error with a broken robot-cuate.svg";
import votesIcon from "../assets/vote.png";
import "../styles/ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState("");
  const isLoggedIn = Object.keys(loggedInUser).length > 0;

  useEffect(() => {
    fetchArticleById(articleId)
      .then((data) => {
        setArticle(data);
        setVotes(data.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      });
  }, [articleId]);

  const handleVote = (voteChange) => {
    if (!isLoggedIn) {
      setError("Log in to vote on this article.");
      return error;
    } else {
      setVotes(votes + voteChange);
      setError("");

      voteOnArticle(articleId, voteChange).catch((err) => {
        setVotes(votes - voteChange);
        setError("Failed to update vote. Please try again.");
      });
    }
  };

  if (isLoading) {
    return <Loading />;
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
            <img className="votes-icon" src={votesIcon} />
            <div className="article-vote-container">
              <button className="vote-arrow" onClick={() => handleVote(1)}>
                <img
                  className="arrow-vote"
                  src={upArrow}
                  alt="up arrow for upvote"
                />
              </button>
              {votes}
              <button className="vote-arrow" onClick={() => handleVote(-1)}>
                <img
                  className="arrow-vote"
                  src={downArrow}
                  alt="down arrow for downvote"
                />
              </button>
            </div>
            {error && <p className="vote-error">{error}</p>}
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
