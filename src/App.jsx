import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const users = await fetchUsers();
    const user = users.find(user => user.username === username);
    
    if (user && user.password === password) {
      setMessage('Login successful');
    } else {
      setMessage('Invalid username or password');
    }
  };

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5001/users.json');
    const data = await response.json();
    return data;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="login-container">
          <h2>Member Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
