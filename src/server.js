const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');

// Funktion zum Laden der Benutzer aus der JSON-Datei
function loadUsers() {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
}

// Funktion zum Speichern der Benutzer in der JSON-Datei
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users.json', (req, res) => {
  res.sendFile(usersFilePath);
});

// API zum Speichern der Reisen
app.post('/save-trips', (req, res) => {
  const { username, trips } = req.body;
  const users = loadUsers();
  const userIndex = users.findIndex(user => user.username === username);

  if (userIndex !== -1) {
    users[userIndex].trips = trips;
    saveUsers(users);
    res.status(200).send('Trips saved');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
