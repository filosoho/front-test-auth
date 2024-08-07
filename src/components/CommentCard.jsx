import { useState, useEffect } from "react";
import "../styles/CommentCard.css";
import heart from "../assets/heart.svg";
import Loading from "./Loading";

const CommentCard = ({ comment, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isCurrentUser = user && user.username === comment.user?.username;

  useEffect(() => {
    const img = new Image();
    img.src = comment.user?.avatar_url || "/default-avatar.png";
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, [comment.user?.avatar_url]);

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        <article className="comment-card">
          <div className="comment-header">
            <div className="container-vote-btn">
              <img
                src={comment.user?.avatar_url || "/default-avatar.png"}
                alt={`${comment.user?.username || "User"}'s avatar`}
                className="comment-author-image"
              />
              <div className="author-info">
                <p className="author-name">
                  {comment.user?.username || "Unknown User"}
                </p>
                <p className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="vote-container">
              <button className="vote-heart">
                <img
                  className="heart-vote"
                  src={heart}
                  alt="heart icon for voting"
                />
              </button>
              {comment.votes}
            </div>
          </div>
          <p className="comment-body">{comment.body}</p>
          {isCurrentUser && (
            <div className="comment-actions">
              <button className="delete-btn">Delete</button>
              <button>Edit</button>
            </div>
          )}
        </article>
      )}
    </section>
  );
};

export default CommentCard;
