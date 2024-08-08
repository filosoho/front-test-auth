import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
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
    </>
  );
};

export default App;

// import React, { Suspense, lazy } from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Loading from "./components/Loading";
// import "./styles/App.css";

// // Lazy load components
// const HomePage = lazy(() => import("./components/HomePage"));
// const ArticlePage = lazy(() => import("./components/ArticlePage"));
// const LoginPage = lazy(() => import("./components/LoginPage"));
// const TopicsPage = lazy(() => import("./components/TopicsPage"));
// const ArticlesByTopicPage = lazy(() =>
//   import("./components/ArticlesByTopicPage")
// );
// const NotFoundPage = lazy(() =>
//   import("./components/ErrorsComponent").then((module) => ({
//     default: module.NotFoundPage,
//   }))
// );

// const App = () => {
//   return (
//     <>
//       <Header />
//       <Suspense fallback={<Loading />}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/topics" element={<TopicsPage />} />
//           <Route path="/articles/:topic" element={<ArticlesByTopicPage />} />
//           <Route path="/article/:articleId" element={<ArticlePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// };

// export default App;
