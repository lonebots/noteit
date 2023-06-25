import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Note.css'
import url from '../../API/Url';
import axios from 'axios';

function AddNote() {
  const navigate = useNavigate();

  // get default date (yyyy-mm-dd)
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const defaultDate = yyyy + '-' + mm + '-' + dd;

  const [note, setNote] = useState({
    title: '',
    content: '',
    date: defaultDate,
  })

  // create note handler 
  const createNoteRequest = async () => {
    const baseURL = url + "/api/note";
    const config = {
      headers: {
        authorization: "Bearer " + localStorage.getItem('access-token')
      }
    };
    try {
      return await axios.post(baseURL, note, config)
    } catch (error) {
      return error.response
    }
  }

  const handleChange = (e) => {
    setNote({
      ...note, [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(note)

    const { data } = await createNoteRequest()
    console.log("data success : ", data.success)
    if (data.success) {
      alert('Note created');
      console.log("data : ", data)
    }
    else {
      alert("Note not created");
    }
    navigate('/dash');
  }

  // 

  return (
    <div className='add-note-container'>
      <h3>Add Note</h3>
      <div className='note-item'>
        <label htmlFor='title' >Title</label>
        <input type="text"
          value={note.title} onChange={handleChange} name="title" />
      </div>
      <div className='note-item'>
        <label htmlFor='content'>Content</label>
        <textarea type="text" value={note.content} onChange={handleChange} name='content' />
      </div>

      <div className='note-item'>
        <label htmlFor='date'>Date</label>
        <input type="date" onChange={handleChange} name='date' value={note.date} />
      </div>
      <button className='btn' onClick={handleSubmit} >Add Note</button>
    </div>
  )
}

export default AddNote