import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

function Nav({ isLogged, setIsLogged }) {

    const handleLogOut = () => {
        setIsLogged(false);
        localStorage.removeItem("access-token")
        localStorage.setItem('is-logged', false)
    }

    return (
        <div className='centre nav-container'>
            <div className='nav-header'>
                Noteit
            </div>
            <ul className='nav-list'>
                {isLogged ?
                    <>
                        <li className='nav-list__item'> <a href='/note/new' className='link nav--link'>New</a></li>
                        <li className='nav-list__item' onClick={handleLogOut}> <a href='/' className='link nav--link'>LogOut</a></li>
                    </>
                    :
                    <>
                        <li className='nav-list__item'> <a href='/login' className='link nav--link'>Login</a></li>
                    </>}

            </ul>
        </div >
    )
}

export default Nav