import React, { useContext } from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { TopicNotFound } from "./ErrorsComponent";
import "../styles/TopicsPage.css";

const TopicsPage = () => {
  const { topics, isLoading, error } = useContext(ArticlesContext);

  if (isLoading) return <Loading />;
  if (error) return <TopicNotFound />;

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
