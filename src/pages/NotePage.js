import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Note.css";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchNote = async () => {
      if (id !== "new") {
        try {
          const response = await axios.get(
            `https://note-app-backend-smoky.vercel.app/api/notes/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setNote(response.data);
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    try {
      if (id === "new") {
        await axios.post("https://note-app-backend-smoky.vercel.app/api/notes", note, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.put(`https://note-app-backend-smoky.vercel.app/api/notes/${id}`, note, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      navigate("/dashboard"); // Redirect to dashboard after saving
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Ensure the token is correct

    try {
      await axios.delete(`https://note-app-backend-smoky.vercel.app/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard'); // Redirect to dashboard after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="note-container">
      <div className="note-header">
        <h2 className="note-title">
          {id === "new" ? "Create Note" : "Edit Note"}
        </h2>
        <button className="note-close-btn" onClick={() => navigate("/dashboard")}>
          &times;
        </button>
      </div>
      <form className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="note-input"
        />
        <textarea
          placeholder="Content"
          rows="10"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="note-textarea"
        />
        <div className="note-actions">
          <button type="button" onClick={handleSave} className="note-btn">
            Save
          </button>
          {id !== "new" && (
            <button type="button" onClick={handleDelete} className="note-btn delete">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NotePage;
