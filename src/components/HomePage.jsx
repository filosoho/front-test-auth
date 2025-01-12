import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { fetchArticles } from "../services/api";
import ArticlesList from "./ArticlesList";
import Loading from "./Loading";
import { CouldNotLoadArticles } from "./ErrorsComponent";
import ascendingImg from "../assets/ascending.svg";
import descendingImg from "../assets/descending.svg";
import "../styles/HomePage.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles({
      sort_by: searchParams.get("sort_by") || "created_at",
      order: searchParams.get("order") || "desc",
      topic: searchParams.get("topic") || null,
      limit: 37,
    })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError(
            "Couldn't fetch articles. Please wait a moment and try again."
          );
        } else {
          setError("An unexpected error occurred.");
        }
        setIsLoading(false);
      });
  }, [searchParams]);

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

  const sortOptions = [
    { value: "created_at", label: "Date" },
    { value: "comment_count", label: "Comment Count" },
    { value: "votes", label: "Votes" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <CouldNotLoadArticles />;
  }

  const customStyles = {
    control: (styles) => ({
      ...styles,
      boxShadow: "none",
      borderColor: "#ccc",
      "&:hover": {
        borderColor: "dimgrey",
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: "80px",
      minWidth: "80px",
      maxWidth: "100px",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#0b0b0b" : "white",
      color: isSelected ? "white" : "#0b0b0b",
      ":hover": {
        backgroundColor: isSelected ? "#0b0b0b" : "#e6141e",
        color: "white",
      },
    }),
  };

  return (
    <section className="home-page">
      <div className="controls">
        <div className="sort-selector">
          <label htmlFor="react-select-3-input">Sort By:</label>
          <Select
            id="sort-select"
            aria-label="Sort By"
            value={sortOptions.find((option) => option.value === sortBy)}
            onChange={handleSortChange}
            options={sortOptions}
            placeholder="Sort By..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
          <img
            onClick={handleOrderChange}
            src={order === "asc" ? descendingImg : ascendingImg}
          />
        </div>
      </div>
      <ArticlesList articles={articles} />
    </section>
  );
};

export default HomePage;
