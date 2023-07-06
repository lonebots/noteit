import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Note.css'
import url from '../../API/Url';
import axios from 'axios';

const UpdateNote = () => {
    const navigate = useNavigate();
    // header config
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
    };

    // note 
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
    })

    // get the id from query string 
    const { id } = useParams();

    // get note - REQUEST
    const getNoteRequest = async (id) => {
        const baseURl = url + `/api/note/${id}`
        try {
            return await axios.get(baseURl, config);
        } catch (error) {
            return error.response
        }
    }

    // update note - REQUEST
    const updateNoteRequest = async (note) => {
        const baseURL = url + `/api/note/${note._id}`;
        try {
            return await axios.put(baseURL, note, config);
        } catch (error) {
            return error.response;
        }
    }

    useEffect(() => {
        const getNote = async (id) => {
            const { data } = await getNoteRequest(id);
            if (data.success) {
                const notedata = data.data;
                setNote({
                    ...notedata,
                    date: notedata.date.split("T")[0]

                })
            }
        }
        getNote(id);
    }, [id])

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default reloading of application
        const { data } = await updateNoteRequest(note);
        if (data.success) {
            alert("Note updated successfully")
            navigate('/dash')
        }
        else {
            alert("Note update failed!, Please Try Again!")
        }
    }
    return (
        <div className='note-container'>
            <h2>Update Note</h2>
            <div className='note-item'>
                <label htmlFor='title' >Title</label>
                <input type="text"
                    value={note.title} onChange={handleChange} name="title" />
            </div>
            <div className='note-item'>
                <label htmlFor='content'>Content</label>
                <textarea data-provide="markdown" value={note.content} onChange={handleChange} name='content' />
            </div>

            <div className='note-item'>
                <label htmlFor='date'>Date</label>
                <input value={note.date} type="date" onChange={handleChange} name='date' />
            </div>
            <button className='btn' onClick={handleSubmit}>
                Update Note
            </button>
        </div>
    )
}

export default UpdateNote