import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import logo from '../assets/logo.png'; // Import your logo image

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State for theme toggle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://note-app-backend-smoky.vercel.app/api/auth/register', { username, email, password });
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '🌞' : '🌜'}
      </div>
      <div className="login-content">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Register</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">Register</button>
        </form>
        <p className="login-text">
          Already have an account? <a href="/" className="login-link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
