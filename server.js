import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { OpenAI } from 'openai';

config();

const app = express();
const port = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.post('/api/setup', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // or gpt-4-turbo / gpt-3.5-turbo if you prefer
      messages: [
        { role: "system", content: "You are an expert sim racing setup engineer. Generate .svm format setups for Le Mans Ultimate based on user input." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const setupText = response.choices[0].message.content;

    res.json({ setup: setupText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate setup' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
