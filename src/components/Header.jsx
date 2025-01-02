import React, { useContext, useRef } from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TopicsBar from "./TopicsBar";
import Toggle from "./Toggle";
import logo from "../assets/news.svg";
import profileImg from "../assets/profile.svg";
import loginImg from "../assets/login.svg";
import logoutImg from "../assets/logout.svg";
import "../styles/Header.css";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";
import TodaysDate from "../utils/TodaysDate";
import ArticleCard from "./ArticleCard";
import searchIcon from "../assets/search.svg";
import chevronLeft from "../assets/chevron-left.svg";
import chevronRight from "../assets/chevron-right.svg";
import envelopeSolidImg from "../assets/envelope-solid.svg";

const Header = () => {
  const { headerArticles } = useContext(ArticlesContext);
  const { loggedInUser } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  const username = loggedInUser.username;
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    } else {
      console.error("scrollRef.current is null on scrollLeft");
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    } else {
      console.error("scrollRef.current is null on scrollRight");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sortedHeaderArticles = [...headerArticles].sort(
    (a, b) => b.created_at - a.created_at
  );

  return (
    <header>
      <div className="bar-box">
        <div className="bar-container">
          <Navbar />
          <section className="user-greeting">
            <img className="icon" src={searchIcon} alt="search icon" />
            <p>Search</p>
            <p>Profile</p>
            <img
              className={
                username ? "icon profile profile-icon" : "icon icon-user"
              }
              src={username ? loggedInUser.avatar_url : profileImg}
              alt="cartoon or person shaped icon"
            />
            {username ? (
              <a href="#!" onClick={handleLogout}>
                <img src={logoutImg} className="login-icon" />
              </a>
            ) : (
              <NavLink to="/login">
                <img src={loginImg} className="logout-icon" />
              </NavLink>
            )}
          </section>
        </div>
      </div>
      <div className="container">
        <div className="news-header">
          <div className="logo-nav-box">
            <div className="subscribe-box">
              <button>
                <img className="icon-envelope" src={envelopeSolidImg} />{" "}
                Newsletter
              </button>
            </div>
            <div className="left-header">
              <div className="logo">
                <img className="logo-img" src={logo} alt="newspaper logo" />
                <h1>NC News</h1>
              </div>
            </div>
            <div className="subscribe-box">
              <TodaysDate />
            </div>
          </div>
        </div>
        <hr></hr>
        <section className="topics-bar">
          <TopicsBar />
          <Toggle />
        </section>
      </div>
      <div className=" categories">
        <img src={chevronLeft} className="scroll-left" onClick={scrollLeft} />
        <div className="category-scroll" ref={scrollRef}>
          <div className="category">
            {sortedHeaderArticles.length > 0 ? (
              sortedHeaderArticles.map((article) => (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  headerArticleInfo
                />
              ))
            ) : (
              <p className="loading">Loading articles... Please wait.</p>
            )}
          </div>
        </div>
        <img
          src={chevronRight}
          className="scroll-right"
          onClick={scrollRight}
        />
      </div>
    </header>
  );
};

export default Header;
