import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../services/api";
import Loading from "../components/Loading";
import "../styles/TopicsPage.css";

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch topics.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="topics-page">
      <h1>Topics</h1>
      <ul className="topics-list">
        {topics.map((topic) => (
          <li key={topic.slug} className="topic-item">
            <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
            <p>{topic.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;
