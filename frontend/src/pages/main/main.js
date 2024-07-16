import React from "react";
import "./main.css";

const Main = () => {

  return (
    <div>
      <div class="heading">Welcome to Graph World !!</div>
      <div class="container">
        <a href="screen2.html">
          <div class="carousel">
            <button class="carousel-button">
                Problem 1
            </button>
          </div>
        </a>
        <a href="screen2.html">
          <div class="carousel">
            <button class="carousel-button">Problem 2</button>
          </div>
        </a>
        <a href="screen2.html">
          <div class="carousel">
            <button class="carousel-button">Problem 3</button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Main;
