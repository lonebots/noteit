import React from 'react'
import { useNavigate } from 'react-router-dom'
import url from '../../API/Url'
import axios from 'axios'
import './Note.css'


function Note({ note }) {
  const config = {
    headers: {
      authorization: "Bearer " + localStorage.getItem('access-token')
    }
  };
  const navigate = useNavigate();
  const updateNote = () => {
    navigate(`/user/update-note/${note._id}`)
  }

  const deleteNoteRequest = async (id) => {
    const baseURL = url + `/api/note/${id}`
    try {
      return await axios.delete(baseURL, config)
    } catch (error) {
      return error.response
    }
  }

  const deleteNote = async () => {
    const { data } = await deleteNoteRequest(note._id)
    if (data.success) {
      alert("Note deleted successfully!");
    } else {
      alert("Note deletion failed!")
    }
    window.location.reload(true);
  }
  return (
    <div className='note-item' >
      <h4 className='note-title'>{note.title}</h4>
      <p className='note-content'>{note.content}</p>
      <p className='note-time'>{note.date}</p>
      <button className='update-note' onClick={updateNote}>Update</button>
      <button className='delete-note' onClick={deleteNote}>Delete</button>
    </div>
  )
}

export default Note