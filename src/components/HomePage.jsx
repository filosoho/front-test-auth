import { useState, useEffect } from "react";
import { fetchArticles } from "../services/api";
import ArticlesList from "./ArticlesList";
import Loading from "./Loading";
import "../styles/HomePage.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="home-page">
      <ArticlesList articles={articles} />
    </section>
  );
};

export default HomePage;
