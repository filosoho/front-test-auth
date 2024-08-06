import { useState, useEffect } from "react";
import { fetchArticles } from "../services/api";
import ArticlesList from "./ArticlesList";
import Lottie from "lottie-react";
import loadingHand from "../assets/animations/loading-animation3.json";
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
      <section className="home-page">
        <article className="lottie">
          <Lottie className="lottie" animationData={loadingHand} loop={true} />
        </article>
      </section>
    );
  }

  return (
    <section className="home-page">
      <ArticlesList articles={articles} />
    </section>
  );
};

export default HomePage;
