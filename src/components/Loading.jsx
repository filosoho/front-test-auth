import React from "react";
import Lottie from "lottie-react";
import loadingHand from "../assets/animations/loading-animation3.json";
import "../styles/Loading.css";

const Loading = () => {
  return (
    <section className="home-page">
      <article className="lottie">
        <Lottie animationData={loadingHand} loop={true} />
      </article>
    </section>
  );
};

export default Loading;
