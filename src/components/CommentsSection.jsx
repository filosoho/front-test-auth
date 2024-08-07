import React, { useState, useEffect, useContext } from "react";
import { fetchCommentsByArticleId } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import CommentCard from "./CommentCard";
import commentsImg from "../assets/comments.png";
import Loading from "./Loading";
import "../styles/CommentsSection.css";

const CommentsSection = ({ articleId }) => {
  const { users, loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCommentsByArticleId(articleId)
      .then((data) => {
        const commentsWithUserDetails = data.map((comment) => ({
          ...comment,
          user: users[comment.author],
        }));
        setComments(commentsWithUserDetails);
        setIsLoading(false);
      })
      .catch((error) => setError("Error fetching comments: " + error.message));
    setIsLoading(false);
  }, [articleId, users]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {loggedInUser.username && (
        <section className="add-comment">
          <label htmlFor="new-comment" className="visually-hidden">
            Add a comment:
          </label>
          <textarea id="new-comment" placeholder="Add a comment..." required />
          <button>Submit</button>
        </section>
      )}
      <section className="comments-section">
        <div className="comments-header">
          <img
            src={commentsImg}
            alt="comments icon"
            className="comments-icon"
          />
          <h2>Comments</h2>
        </div>
        {error && <p className="error">{error}</p>}
        <p className="comment-count">
          ({comments.length} Comment{comments.length !== 1 ? "s" : ""})
        </p>
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              user={loggedInUser}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CommentsSection;
