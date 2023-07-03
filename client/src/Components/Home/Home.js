import React from 'react'
import './Home.css'
import noteAnimate from '../Assets/note-animation.gif'

function Home({ }) {
    return (
        <div className='home-container'>
            <h1 className='hero'>Your Ultimate <span>Note-Making  </span> Companion!</h1>
            <img src={noteAnimate} alt='animate' height="400" />
        </div>
    )
}

export default Home