import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import your logo image
import '../css/Login.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State for theme toggle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://note-app-backend-smoky.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
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
        <h1 className="login-title">Good Note</h1>
        <h2 className="login-subtitle">By Ramgopal</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="login-text">
          Don't have an account? <a href="/register" className="login-link">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
