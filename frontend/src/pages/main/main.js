import React from "react";
import "./main.css";
import { ques } from "../../data/questions";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
  const currentSessionId = uuidv4();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = React.useState("");
  return (
    <div>
      <div class="heading">Welcome to Graph World !!</div>
      <div class="container">
        {ques.map((q, index) => {
          return (
            <div className="carousel">
              <button
                className="carousel-button"
                onClick={() => {
                  setCurrentQuestion(q.question);
                  
                  navigate("/home", { state: { currentQuestion: q.question , sessionId:currentSessionId } });
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
