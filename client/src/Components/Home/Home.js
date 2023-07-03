import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import noteAnimate from '../Assets/note-animation.gif'

function Home({ }) {
    const isLogged = localStorage.getItem('is-logged');
    const navigate = useNavigate()
    useEffect(() => {
        function navgateBacktoDash(isLogged) {
            if (isLogged) {
                navigate('/dash');
            }
        }
        navgateBacktoDash(isLogged)
    }, [isLogged])

    return (
        <div className='home-container'>
            <h1 className='hero'>Your Ultimate <span>Note-Making  </span> Companion!</h1>
            <img src={noteAnimate} alt='animate' height="400" />
        </div>
    )
}

export default Home