import { useState, useEffect } from "react";
import { fetchArticles } from "../services/api";
import ArticlesList from "./ArticlesList";
import Lottie from "lottie-react";
import loadingHand from "../assets/animations/loading-animation.json";
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
    return (
      <div className="home-page">
        <div className="lottie">
          <Lottie className="lottie" animationData={loadingHand} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <ArticlesList articles={articles} />
    </div>
  );
};

export default HomePage;
