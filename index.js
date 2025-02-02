require('dotenv').config();
const { OpenAI } = require('openai');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI API client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key from the .env file
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define the route for handling chat requests
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message is required.' });
  }

  try {
    // Send the user's message to the OpenAI API and get the response
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Or gpt-4 if you have access
      messages: [{ role: 'user', content: message }],
    });

    // Return the AI's reply to the front-end
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
