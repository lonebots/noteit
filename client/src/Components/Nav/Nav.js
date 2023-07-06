import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
import logo from '../Assets/icon.png'
import { Link } from 'react-router-dom'

function Nav({ isLogged, setIsLogged }) {
    const navigate = useNavigate()
    const handleLogOut = () => {
        setIsLogged(false);
        localStorage.removeItem("access-token")
        localStorage.removeItem('is-logged')
        navigate('/')
    }

    return (
        <div className='nav'>
            <div className='nav-container'>
                <div className='nav-header'>
                    <Link to='/'><h1> noteit <img className='logo' src={logo} alt='app-logo' height="60" /></h1></Link>
                </div>
                <ul className='nav-list'>
                    {isLogged ?
                        <>
                            <li className='nav-list__item'> <Link to='/note/new' className='nav--link'>New</Link></li>
                            <li className='nav-list__item' onClick={handleLogOut}> <Link to='/' className='link nav--link'>LogOut</Link></li>
                        </>
                        :
                        <>
                            <li className='nav-list__item'> <Link to='/login' className='nav--link'>Login</Link></li>
                            <li className='nav-list__item'> <Link to='/register' className='link nav--link'>Register</Link></li>

                        </>}

                </ul>
            </div >
        </div>
    )
}

export default Nav