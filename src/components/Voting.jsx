import { useState, useEffect, useContext } from "react";
import { voteOnArticle } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";
import votesIcon from "../assets/vote.png";
import "../styles/Voting.css";

const Voting = ({ articleId, initialVotes }) => {
  const { loggedInUser } = useContext(UserContext);
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState("");
  const [userVote, setUserVote] = useState(0);
  const isLoggedIn = Boolean(loggedInUser.username);

  useEffect(() => {
    const storedVote = localStorage.getItem(
      `vote-${articleId}-${loggedInUser.username}`
    );
    if (storedVote) {
      setUserVote(Number(storedVote));
    }
  }, [articleId, loggedInUser.username]);

  const handleVote = (voteChange) => {
    if (!isLoggedIn) {
      setError("Log in to vote on this article.");
      return;
    }

    const newVote = userVote === voteChange ? 0 : voteChange;
    const voteDiff = newVote - userVote;

    setVotes((prevVotes) => prevVotes + voteDiff);
    setUserVote(newVote);
    localStorage.setItem(`vote-${articleId}-${loggedInUser.username}`, newVote);

    setError("");

    voteOnArticle(articleId, voteDiff).catch((err) => {
      setVotes((prevVotes) => prevVotes - voteDiff);
      setUserVote(userVote);
      localStorage.removeItem(`vote-${articleId}-${loggedInUser.username}`);
      setError("Failed to update vote. Please try again.");
    });
  };

  return (
    <div className="voting-component">
      <img className="votes-icon" src={votesIcon} alt="votes icon" />
      <div className="article-vote-container">
        <button
          className={`vote-arrow ${userVote === 1 ? "active" : ""}`}
          onClick={() => handleVote(1)}
        >
          <img className="arrow-vote" src={upArrow} alt="up arrow for upvote" />
        </button>
        {votes}
        <button
          className={`vote-arrow ${userVote === -1 ? "active" : ""}`}
          onClick={() => handleVote(-1)}
        >
          <img
            className="arrow-vote"
            src={downArrow}
            alt="down arrow for downvote"
          />
        </button>
      </div>
      {error && <p className="vote-error">{error}</p>}
    </div>
  );
};

export default Voting;
