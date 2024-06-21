import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
    </div>
  );
}

function Login() {
  return (
    <div className="login-container">
      <h2>Member Login</h2>
      <form>
        <div className="input-container">
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
