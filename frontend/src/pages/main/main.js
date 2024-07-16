import React from "react";
import "./main.css";
import { ques } from "../../data/questions";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = React.useState("");
  return (
    <div>
      <div class="heading">Welcome to Graph World !!</div>
      <div class="container">
        {ques.map((q, index) => {
          return (
            <div class="carousel">
              <button
                class="carousel-button"
                onClick={() => {
                  setCurrentQuestion(q.question);
                  navigate("/home", { state: { currentQuestion: currentQuestion } });
                }}
              >
                <h1>Problem {index + 1}</h1>
                {q.question}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
