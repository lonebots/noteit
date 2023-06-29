import { React, useState, useEffect } from 'react'
import Note from '../Notes/Note'
import url from '../../API/Url'
import axios from 'axios'

const Dashboard = () => {
    console.log("dash component run")
    const [notes, setNotes] = useState(null)

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
            console.log("note request error : ", error.response)
            return error.response
        }

    }
    // to get all user notes
    useEffect(() => {
        console.log('dash useeffect run')
        const getNotes = async () => {
            const res = await getNotesRequest();
            console.log("notes data : ", res.data);
            const Notes = res.data.data;
            if (res.data.success) {
                setNotes(Notes)
            }

            console.log("notes :", notes)
        }
        getNotes()

    }, [])

    return (
        <div className='dashboard-container'>
            <>Dashboard</>
            {notes &&
                notes.map((note) => {
                    return (<Note key={note._id} note={note} />
                    )
                })
            }
        </div>
    )
}

export default Dashboard