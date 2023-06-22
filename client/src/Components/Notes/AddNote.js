import React, { useState } from 'react'
import './Note.css'

function AddNote() {
  const defaultDate = new Date()
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: defaultDate,
  })

  const handleChange = (e) => {
    setNote({
      ...note, [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note)
  }

  // set-default-date 
  // let defaultDate = new Date()
  // defaultDate.setDate(defaultDate.getDate())

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