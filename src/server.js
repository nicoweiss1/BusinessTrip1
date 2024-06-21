const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'users.json'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
