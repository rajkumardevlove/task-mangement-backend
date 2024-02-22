const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 5000;

app.use(express.json());

app.post('/generateContent', async (req, res) => {
  try {
  const API_KEY = 'AIzaSyDoeQSysD3ad-oSuCyCmdwuXrVYkR8wah8';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const {prompt} = req.body;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});