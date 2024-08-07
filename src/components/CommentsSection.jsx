import React, { useState, useEffect, useContext } from "react";
import { fetchCommentsByArticleId, postComment } from "../services/api";
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
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCommentsByArticleId(articleId)
      .then((data) => {
        const commentsWithUserDetails = data.map((comment) => ({
          ...comment,
          user: users[comment.author],
        }));
        commentsWithUserDetails.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setComments(commentsWithUserDetails);
        setIsLoading(false);
      })
      .catch((error) => setError("Error fetching comments: " + error.message));
    setIsLoading(false);
  }, [articleId, users]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentText.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const commentData = {
      username: loggedInUser.username,
      body: commentText,
    };

    postComment(articleId, commentData)
      .then((newComment) => {
        setComments((prevComments) => {
          const updatedComments = [
            { ...newComment, user: users[newComment.author] },
            ...prevComments,
          ];
          updatedComments.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          return updatedComments;
        });
        setCommentText("");
        setSuccessMessage("Your comment has been posted successfully.");
      })
      .catch(() => {
        setError("Failed to post comment. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {loggedInUser.username && (
        <section className="add-comment">
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-comment" className="visually-hidden">
              Add a comment:
            </label>
            <textarea
              id="new-comment"
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Submit"}
            </button>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
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
