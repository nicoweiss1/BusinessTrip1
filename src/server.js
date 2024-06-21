const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const usersFilePath = './users.json';

// Funktion zum Laden der Benutzer aus der JSON-Datei
function loadUsers() {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
}

// Funktion zum Speichern der Benutzer in der JSON-Datei
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Registrierungsroute
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  // Überprüfen, ob der Benutzername bereits existiert
  if (users.find(user => user.username === username)) {
    return res.status(400).send('Username already exists');
  }

  // Passwort hashen
  const hashedPassword = await bcrypt.hash(password, 10);

  // Benutzer hinzufügen
  users.push({ username, password: hashedPassword });
  saveUsers(users);

  res.status(201).send('User registered');
});

// Login-Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  // Benutzer finden
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  // Passwort überprüfen
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid username or password');
  }

  res.status(200).send('Login successful');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
