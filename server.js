require('dotenv').config();

const express = require('express');
const { OpenAI } = require('openai');  // Destructure or use `const OpenAI = require('openai');`
const app = express();
const port = 3000;

app.use(express.json()); // to parse JSON in POST requests

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// test route
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// openai test route
app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

/*

const response = await openai.responses.create({
  prompt: {
    "id": "pmpt_687077b7ec58819588cef12af80c3b2505d5e4c8b586cb82",
    "version": "6",
    "variables": {
      "topic": "example topic",
      "difficulty": "example difficulty"
    }
  }
});

*/