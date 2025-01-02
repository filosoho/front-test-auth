import React from "react";
import TopicsBar from "./TopicsBar";
import Navbar from "./Navbar";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <section className="footer-row">
          <article className="footer col-1">
            <div className="footer-box">
              <h2 className="footer-title">Newsletter</h2>
              <p className="footer-newsletter-tagline">
                Stay informed with the latest headlines and trending stories.
              </p>
              <p>
                Subscribe now to receive personalized updates delivered to your
                inbox daily!
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Your email address"
                  required=""
                />
                <input type="submit" value="Sign up" />
              </form>
            </div>
          </article>
          <article className="footer col-2">
            <div className="footer-box">
              <h2 className="footer-title">Category</h2>
              <TopicsBar />
            </div>
          </article>
          <article className="footer col-3">
            <div className="footer-box">
              <h2 className="footer-title">Site Links</h2>
              <Navbar />
            </div>
          </article>
          <article className="footer col-4">
            <div className="footer-box">
              <h2 className="footer-title">About Us</h2>
              <p>
                NC News delivers reliable, up-to-date stories that matter. From
                breaking headlines to in-depth features, we aim to keep you
                informed and connected. Stay curious with NC News.
              </p>
            </div>
          </article>
        </section>
        <section className="footer-secondary clearfix">
          <p className="copyright">
            © 2024{" "}
            <a href="https://fe-nc-news-gui8.onrender.com/" target="_blank">
              NC News
            </a>
            . All rights reserved. NC News is a subsidiary of NewsCorp.
          </p>
          <div className="footer-right">
            <Navbar />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
