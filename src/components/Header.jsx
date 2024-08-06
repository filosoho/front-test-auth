import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../assets/news.svg";
import profile from "../assets/profile.svg";
import "../styles/Header.css";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();
  const username = loggedInUser.username;

  return (
    <>
      <Link className="logo-anchor" to="/">
        <img className="logo-img" src={logo} alt="newspaper logo" />
      </Link>
      <header>
        {!(location.pathname === "/login") && username && (
          <section className="user-greeting">
            <article className="user-container">
              <h2>Hi, {username}</h2>
              <img
                className="icon profile"
                src={profile}
                alt="person shaped icon"
              />
            </article>
          </section>
        )}

        <h1>NC News</h1>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
