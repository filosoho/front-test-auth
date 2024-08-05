import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../assets/news.svg";
import "../styles/Header.css";

const Header = () => {
  return (
    <>
      <Link className="logo-anchor" to="/">
        <img className="logo-img" src={logo} alt="newspaper logo " />
      </Link>
      <header>
        <h1>NC News</h1>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
