import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Note.css'

function UpdateNote() {
    // get the id from query string 
    const { id } = useParams()

    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: '',

    })

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the default reloading of application
        console.log('click handle submit')
    }
    return (
        <div className='add-note-container'>
            <h3>Update Note</h3>
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
                <input value={note.date} type="date" onChange={handleChange} name='date' />
            </div>
            <button onSubmit={handleSubmit}>
                Update Note
            </button>
        </div>
    )
}

export default UpdateNote