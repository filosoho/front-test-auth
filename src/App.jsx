import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
      </Routes>
    </div>
  );
};

export default App;
