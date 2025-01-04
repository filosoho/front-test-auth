import { createContext, useState, useEffect } from "react";
import { fetchArticles, fetchTopics } from "../services/api";

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [allArticles, setAllArticles] = useState([]);
  const [headerArticles, setHeaderArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchArticles({ limit: 37 }), fetchTopics()])
      .then(([articlesData, topicsData]) => {
        setAllArticles(articlesData.articles);
        setTopics(topicsData);

        const headerArticles = articlesData.articles
          .filter((article) => article.topic === "coding")
          .slice(6, 13);
        setHeaderArticles(headerArticles);
        setArticles(articlesData.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An unexpected error occurred.");
        setIsLoading(false);
      });
  }, []);

  const filterArticles = (params) => {
    const { topic, sort_by, order } = params;
    setIsLoading(true);

    fetchArticles({ topic, sort_by, order, limit: 37 })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An unexpected error occurred.");
        setIsLoading(false);
      });
  };

  return (
    <ArticlesContext.Provider
      value={{
        allArticles,
        headerArticles,
        articles,
        topics,
        isLoading,
        error,
        filterArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
