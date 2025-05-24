const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all origins - adjust as needed
app.use(express.json());

app.post('/api/setup', (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  // For demonstration, generate a fake setup string based on prompt
  const setup = `; Generated Le Mans Setup\n; Prompt received:\n${prompt}\n\n[Setup]\nSuspension=medium\nTires=soft\nFuel=full\n\n; End of setup`;

  // Send back JSON with setup string
  res.json({ setup });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});

