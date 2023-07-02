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
    <div className='note' >
      <div className='note-header' >
        <h3 className='note-title'>{note.title}</h3>
        <p className='note-time'>{note.date.split("T")[0]}</p>
      </div>
      <p className='note-content'>{note.content}</p>

      <div className='btn-container'>
        <button className='btn space' onClick={updateNote}>Update</button>
        <button className='btn space' onClick={deleteNote}>Delete</button>
      </div>
    </div>
  )
}

export default Note