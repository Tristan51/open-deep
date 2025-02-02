require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key from the .env file
});

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

// API route to handle the chat requests
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message is required.' });
  }

  try {
    // Send the message to OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Or 'gpt-4' if you have access
      messages: [{ role: 'user', content: message }],
    });

    // Send the AI's reply back to the front-end
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).send({ error: 'Something went wrong with the AI service.' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
