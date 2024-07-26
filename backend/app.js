// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// var cors = require("cors");
// const env = require("dotenv").config();
// app.use(cors());

// app.use(bodyParser.json({ extended: true }));

// const { OpenAI } = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.apiKey,
//   baseApiUrl: "https://api.openai.com/v1",
// });

// async function getGPT4Response(prompt) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: "You are a helpful assistant named Gpt" },
//         { role: "user", content: prompt },
//       ],
//       max_tokens: 150,
//     });

//     return response.choices[0].message.content.trim();
//   } catch (error) {
//     console.error("Error getting response from GPT:", error.message);
//     return "Error getting response from GPT.";
//   }
// }

// app.post("/api/chat", async (req, res) => {
//   const prompt = await req.body.prompt;
//   console.log("Prompt:", prompt);
//   try {
//     // console.log('hello');
//     const response = await getGPT4Response(prompt);
//     console.log(response);
//     res.send({
//       mesaage: "success",
//       response: response,
//     });
//     // console.log("GPT-4 response:", response);
//   } catch (e) {
//     console.log(e);
//   }
// });

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));

const openai = new OpenAI({
  apiKey: process.env.apiKey,
  baseApiUrl: "https://api.openai.com/v1",
});

const DATA_FILE_PATH = path.join(__dirname, "conversation_data.json");
const CONTEXT_WINDOW_SIZE = 10;

let conversationHistory = {};

const loadConversationData = () => {
  if (fs.existsSync(DATA_FILE_PATH)) {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    conversationHistory = JSON.parse(data);
  }
};

const saveConversationData = () => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(conversationHistory, null, 2));
};
const clearConversationData = () => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({}, null, 2));
};

loadConversationData();

async function getGPT4Response(sessionId, prompt) {
  if (!conversationHistory[sessionId]) {
    conversationHistory[sessionId] = [];
  }

  const sessionMessages = conversationHistory[sessionId];

  sessionMessages.push({ role: "user", content: prompt });

  const context = [
    { role: "system", content: "You are a helpful assistant named Gpt" },
    ...sessionMessages.slice(-CONTEXT_WINDOW_SIZE),
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: context,
      max_tokens: 150,
    });

    const reply = response.choices[0].message.content.trim();
    sessionMessages.push({ role: "assistant", content: reply });
    saveConversationData();

    return reply;
  } catch (error) {
    console.error("Error getting response from GPT:", error.message);
    return "Error getting response from GPT.";
  }
}

app.post("/api/chat", async (req, res) => {
  const { sessionId, prompt } = req.body;

  if (!sessionId || !prompt) {
    return res.status(400).send({ message: "sessionId and prompt are required" });
  }

  console.log("Prompt:", prompt);

  try {
    const response = await getGPT4Response(sessionId, prompt);
    console.log("GPT-4 response:", response);
    res.send({ message: "success", response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error getting response" });
  }
});
const server = app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
const gracefulShutdown = (signal) => {
  console.log(`Received signal: ${signal}`);
  console.log("Clearing conversation data...");

  // Clear the conversation data
  clearConversationData();

  console.log("Conversation data cleared. Shutting down server...");

  // Close the server gracefully
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });

  // Force shutdown if server takes too long to close
  setTimeout(() => {
    console.error("Forcefully shutting down...");
    process.exit(1);
  }, 10000); // 10 seconds timeout
};

// Catch various termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown); // For Ctrl+C in terminal
process.on("SIGQUIT", gracefulShutdown);

// Catch the exit event
process.on("exit", (code) => {
  console.log(`Process exited with code: ${code}`);
});

// Optional: Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  gracefulShutdown("uncaughtException");
});

