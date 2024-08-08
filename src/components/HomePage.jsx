import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { fetchArticles, fetchTopics } from "../services/api";
import ArticlesList from "./ArticlesList";
import Loading from "./Loading";
import { TopicNotFound } from "./ErrorsComponent";
import "../styles/HomePage.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchTopics()
      .then((data) => {
        setTopics(data);
        return fetchArticles({
          sort_by: searchParams.get("sort_by") || "created_at",
          order: searchParams.get("order") || "desc",
          topic: searchParams.get("topic") || null,
        });
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Topic not found.");
        } else {
          setError("An unexpected error occurred.");
        }
        setIsLoading(false);
      });
  }, [searchParams]);

  const handleTopicChange = (selectedOption) => {
    setSelectedTopic(selectedOption);
    setSearchParams({
      topic: selectedOption ? selectedOption.value : "",
      sort_by: sortBy,
      order: order,
    });
  };

  const handleSortChange = (selectedOption) => {
    setSortBy(selectedOption.value);
    setSearchParams({
      topic: selectedTopic ? selectedTopic.value : "",
      sort_by: selectedOption.value,
      order: order,
    });
  };

  const handleOrderChange = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setSearchParams({
      topic: selectedTopic ? selectedTopic.value : "",
      sort_by: sortBy,
      order: newOrder,
    });
  };

  const topicOptions = topics.map((topic) => ({
    value: topic.slug,
    label: topic.slug,
  }));

  const sortOptions = [
    { value: "created_at", label: "Date" },
    { value: "comment_count", label: "Comment Count" },
    { value: "votes", label: "Votes" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <TopicNotFound />;
  }

  return (
    <section className="home-page">
      <div className="controls">
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
        <div className="sort-selector">
          <label htmlFor="sort-select">Sort By:</label>
          <Select
            id="sort-select"
            value={sortOptions.find((option) => option.value === sortBy)}
            onChange={handleSortChange}
            options={sortOptions}
          />
          <button onClick={handleOrderChange}>
            {order === "asc" ? "Descending" : "Ascending"}
          </button>
        </div>
      </div>
      <ArticlesList articles={articles} />
    </section>
  );
};

export default HomePage;
