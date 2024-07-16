const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
app.use(cors());

app.use(bodyParser.json({ extended: true }));

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "sk-proj-j4aNWkaWDJItnhtZczAwT3BlbkFJM0b7bm3RAaIblIW7xg38",
  baseApiUrl: "https://api.openai.com/v1",
});

async function getGPT4Response(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant named json" },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error getting response from GPT-4:", error.message);
    return "Error getting response from GPT-4.";
  }
}

app.post("/api/chat", async (req, res) => {
  const prompt = await req.body.prompt;
  console.log("Prompt:", prompt);
  try {
    // console.log('hello');
    const response = await getGPT4Response(prompt);
    console.log(response);
    res.send({
      mesaage:"success",
      response:response,
    });
    // console.log("GPT-4 response:", response);
  } catch (e) {
    console.log(e);
  }
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
