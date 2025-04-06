const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the Vite build directory
app.use(express.static(path.join(process.cwd(), 'dist')));

// Handle React routing, return index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Serving static files from:', path.join(process.cwd(), 'dist'));
  console.log('Server is running on http://localhost:' + PORT);
});