import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { fetchArticles, fetchTopics } from "../services/api";
import ArticlesList from "./ArticlesList";
import Loading from "./Loading";
import "../styles/HomePage.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    fetchTopics()
      .then((data) => {
        setTopics(data);
        return fetchArticles();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics or articles: ", error);
        setIsLoading(false);
      });
  }, []);

  const handleTopicChange = (selectedOption) => {
    setSelectedTopic(selectedOption);
    if (selectedOption) {
      navigate(`/articles/${selectedOption.value}`);
    }
  };

  const topicOptions = topics.map((topic) => ({
    value: topic.slug,
    label: topic.slug,
  }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="home-page">
      <div className="topic-selector">
        <label htmlFor="topic-select"></label>
        <Select
          id="topic-select"
          value={selectedTopic}
          onChange={handleTopicChange}
          options={topicOptions}
          placeholder="Select a topic..."
        />
      </div>
      <ArticlesList articles={articles} />
    </section>
  );
};

export default HomePage;
