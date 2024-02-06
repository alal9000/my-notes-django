import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`http://localhost:8000/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    fetch(`http://localhost:8000/api/notes/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    });
  };

  let createNote = async () => {
    fetch(`http://localhost:8000/api/notes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    fetch(`http://localhost:8000/api/notes/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    navigate("/");
  };

  let handleSubmit = () => {
    console.log('NOTE', note)
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === 'new' && note !== null) {
      createNote()
    }
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote(note => ({ ...note, body: e.target.value }));
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
