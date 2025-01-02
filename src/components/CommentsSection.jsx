import React, { useState, useEffect, useContext } from "react";
import {
  fetchCommentsByArticleId,
  postComment,
  deleteComment,
} from "../services/api";
import { UserContext } from "../contexts/UserContext";
import CommentCard from "./CommentCard";
import ConfirmationDialog from "./ConfirmationDialog";
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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

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
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setError("Comments not found.");
          } else {
            setError("An error occurred while fetching comments.");
          }
        } else if (error.request) {
          setError("Network error: Unable to reach the server.");
        } else {
          setError("An unexpected error occurred.");
        }
        setIsLoading(false);
      });
  }, [articleId, users]);

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage]);

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
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setError(
              "Failed to post comment. Please provide all required information."
            );
          } else {
            setError("An error occurred while posting your comment.");
          }
        } else if (error.request) {
          setError("Network error: Unable to reach the server.");
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        setSuccessMessage("");
      });
  };

  const showDialog = (comment) => {
    setCommentToDelete(comment);
    setDialogVisible(true);
  };

  const handleDelete = () => {
    if (!commentToDelete) return;

    deleteComment(commentToDelete.comment_id)
      .then((response) => {
        if (response.status === 204) {
          setComments((prevComments) =>
            prevComments.filter(
              (comment) => comment.comment_id !== commentToDelete.comment_id
            )
          );
          setSuccessMessage("Comment deleted successfully.");
        }
      })
      .catch((error) => {
        if (error.response) {
          setError("Failed to delete comment. Please try again.");
        } else if (error.request) {
          setError("Network error: Unable to reach the server.");
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setDialogVisible(false);
        setCommentToDelete(null);
      });
  };

  const handleCancel = () => {
    setDialogVisible(false);
    setCommentToDelete(null);
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
            <p className={`success ${successMessage ? "visible" : ""}`}>
              {successMessage}
            </p>
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
        <p className="comment-count">
          ({comments.length} Comment{comments.length !== 1 ? "s" : ""})
        </p>
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              user={loggedInUser}
              onDelete={showDialog}
            />
          ))}
        </div>
      </section>
      {dialogVisible && (
        <ConfirmationDialog
          message="Are you sure you want to delete this comment?"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default CommentsSection;
