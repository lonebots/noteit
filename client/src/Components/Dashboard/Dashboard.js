import { React, useState, useEffect } from 'react'
import Note from '../Notes/Note'
import url from '../../API/Url'
import axios from 'axios'
import dashImage from '../Assets/dash-note.png'

const Dashboard = () => {
    const [notes, setNotes] = useState([])

    // header config
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
    };

    const getNotesRequest = async () => {
        const baseURL = url + "/api/note";
        try {
            return await axios.get(baseURL, config)
        } catch (error) {
            return error.response
        }
    }

    // to get all user notes
    useEffect(() => {
        const getNotes = async () => {
            const res = await getNotesRequest();
            const Notes = res.data.data;
            if (res.data.success) {
                setNotes(Notes)
            }
        }
        getNotes()
    }, [setNotes])

    return (
        <div className='dashboard-container'>
            {notes.length !== 0 ?
                notes.map((note) => {
                    return (<Note key={note._id} note={note} setNotes={setNotes} />
                    )
                })
                :
                <img src={dashImage} alt='add-new-note' height="190" width="190" />
            }
        </div>
    )
}

export default Dashboard