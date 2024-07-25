import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Dashboard.css'; // Ensure you have this stylesheet imported
import logo from '../assets/logo.png'; // Import your logo image

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://note-app-backend-smoky.vercel.app/api/notes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNote = () => {
    navigate('/note/new');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`https://note-app-backend-smoky.vercel.app/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => {
      const newDarkMode = !prevDarkMode;
      document.body.classList.toggle('dark-mode', newDarkMode);
      return newDarkMode;
    });
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Good Note</h1>
        </div>
        <div className="navbar-right">
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? '🌞' : '🌜'}
          </button>
        </div>
      </nav>
      <div className="main-content">
        <header className="dashboard-header">
          <h2 className="dashboard-title">Dashboard</h2>
        </header>
        {isLoading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes available. Create a new note!</p>
        ) : (
          <div className="notes-container">
            {notes.map(note => (
              <div key={note._id} className="note-card">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <div className="note-actions">
                  <Link to={`/note/${note._id}`} className="note-link">Edit</Link>
                  <button onClick={() => handleDeleteNote(note._id)} className="note-delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button onClick={handleCreateNote} className="fab">+</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default DashboardPage;
