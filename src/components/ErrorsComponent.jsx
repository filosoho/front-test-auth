import React from "react";
import "../styles/ErrorsComponent.css";
import error400Image from "../assets/400-Error-Bad-Request-rafiki.svg";
import error404Image from "../assets/Oops!-404-Error-with-a-broken-robot-cuate.svg";
import monsterError404 from "../assets/Monster-404-Error-amico.svg";
import error404Img from "../assets/Monster-404-Error-cuate.svg";

export function BadRequestPage() {
  return (
    <section className="error-400-section">
      <article>
        <img
          src={error400Image}
          alt="Bad Request 400 Error with a cute red creature"
          className="error-400-image"
        />
        <h3>Beware! The Bad Request Beast Awaits!</h3>
        <p>
          It appears your request was not quite right and the Bad Request Beast
          has taken notice.
        </p>
      </article>
    </section>
  );
}

export function NotFoundArticle() {
  return (
    <section className="error-404-section">
      <article>
        <img
          src={error404Image}
          alt="Oops! 404 Error with a broken robot-cuate"
          className="error-404-image"
        />
        <h3>Article Not Found</h3>
        <p>The Article Goblin Strikes Again!</p>
        <p>
          Alas, this article has been spirited away by the mischievous Article
          Goblin.
        </p>
      </article>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="not-found">
      <article>
        <img
          src={error404Img}
          alt="404 - Page Not Found cute monster eating zero"
        />

        <h3>Page Not Found</h3>
        <p>Yikes! We couldn't find the page you were looking for.</p>
        <p>Maybe it was eaten by a monster!</p>
      </article>
    </section>
  );
}

export function TopicNotFound() {
  return (
    <section className="error-404-section">
      <article>
        <img
          src={monsterError404}
          alt="404 Error Topic Not Found with a cute monster"
          className="error-404-image"
        />
        <h3>Topic Not Found</h3>
        <p>Oh no! This topic seems to have vanished into thin air.</p>
      </article>
    </section>
  );
}

export function CouldNotLoadArticles() {
  return (
    <section className="error-404-section">
      <article>
        <img
          src={monsterError404}
          alt="404 Error Could Not Load Articles with a cute monster"
          className="error-404-image"
        />
        <h3>Uh-oh! Articles Are Taking Their Sweet Time</h3>
        <p>
          Something went a bit sideways. Refresh the page and we’ll get those
          articles back on track!
        </p>
      </article>
    </section>
  );
}

// <a href="https://storyset.com/internet">Internet illustrations by Storyset</a>
