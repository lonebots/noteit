import React from 'react'
import { Navigate } from 'react-router-dom'
import './Home.css'
import noteAnimate from '../Assets/note-animation.gif'

const Home = ({ isLogged }) => {
    if (isLogged) {
        return <Navigate to="/dash" />
    }
    else {
        return (< div className='home-container' >
            <h1 className='hero'>Your Ultimate <span className=''>Note Making </span> Companion!</h1>
            <img className='hero-animation' src={noteAnimate} alt='animate' height="400" />
        </div >)
    }
}

export default Home