import "./index.css";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const { currentQuestion } = location.state || {};
  console.log("Current Question:", currentQuestion);
  const [data, setData] = useState("");
  const [prompt, setPrompt] = useState("");
  const getPrompt = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        prompt: prompt,
      });
      setData(response.data.response);
    } catch (error) {
      console.error("Error getting response from GPT-4:", error.message);
    }
  };
  return (
    <>
      <div className="page-container">
        <h1 className="heading">Welcome to Graph World</h1>
        <div className="grid-container">
          <div className="grid-item item1">{currentQuestion}</div>
          <div className="grid-item item2"><h1 style={{ color: "black" }}>Current Sub Quenstion</h1></div>
          <div className="grid-item item3">
            <div>
              <div id="output" class="output-container">
                
                      {data && <div>{data}</div>}
                    
                
              </div>
            </div>
          </div>
          <div className="grid-item item4">
            {" "}
            <form id="myForm">
              <input
                type="text"
                id="inputBox"
                class="input-box"
                placeholder="Enter your Question"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
              />
              <button
                type="submit"
                class="submit-button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Prompt:", prompt);
                  document.getElementById("myForm").reset();
                  setData("Loading...");
                  getPrompt();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
