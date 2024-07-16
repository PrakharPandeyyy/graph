import "./index.css";
import React from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
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
      {data && (
        <div>
          <div  id="output" class="output-container" >
            <div class="chat-box-inner">
              <div class="chat-box-inner-text">
                <div class="chat-box-inner-text-system">
                  {data && <div>{data}</div>}
                </div>
                <div class="chat-box-inner-text-user"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
