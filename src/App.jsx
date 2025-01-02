import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import LoginPage from "./components/LoginPage";
import TopicsPage from "./components/TopicsPage";
import ArticlesByTopicPage from "./components/ArticlesByTopicPage";
import { NotFoundPage } from "./components/ErrorsComponent";
import "./styles/App.css";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/articles/:topic" element={<ArticlesByTopicPage />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
