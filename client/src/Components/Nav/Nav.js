import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
import logo from '../Assets/icon.png'

function Nav({ isLogged, setIsLogged }) {
    const navigate = useNavigate()
    const handleLogOut = () => {
        setIsLogged(false);
        localStorage.removeItem("access-token")
        localStorage.setItem('is-logged', false)
        navigate('/')
    }

    return (
        <div className='nav'>
            <div className='center nav-container'>
                <div className='nav-header'>
                    <a href='/'><h1> noteit <img src={logo} alt='app-logo' height="60" /></h1></a>
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
                            <li className='nav-list__item register'> <a href='/register' className='link nav--link'>Register</a></li>
                        </>}

                </ul>
            </div >
        </div>
    )
}

export default Nav