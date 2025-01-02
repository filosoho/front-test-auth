import React from "react";
import Lottie from "lottie-light-react";
import loadingHand from "../assets/animations/loading-animation3.json";
import "../styles/Loading.css";

const Loading = () => {
  return (
    <section className="loading-box">
      <article className="lottie-animation">
        <Lottie animationData={loadingHand} loop={true} />
      </article>
    </section>
  );
};

export default Loading;
