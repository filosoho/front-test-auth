import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-api-backend.onrender.com/api",
});

export const fetchArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};
