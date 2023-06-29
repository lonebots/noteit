import React from 'react'
import './Note.css'

function Note({ note }) {
  const updateNote = () => {

  }

  const deleteNote = () => {

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