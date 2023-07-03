import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import url from '../../API/Url.js'
import axios from 'axios'
import './Register.css'


function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const registerUser = async () => {
        const baseURL = url + '/user/register'
        try {
            return await axios.post(baseURL, user);
        } catch (error) {
            return error.response
        }
    }

    const handleChange = (e) => {
        setUser(
            { ...user, [e.target.name]: e.target.value }
        )
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const { data } = await registerUser();
        if (data.success) {
            alert("User registered successfully");
            navigate('/login')
        }
        else {
            alert(`User registraction failed reason : ${data.error}`)
        }
    }

    return (
        <form className='register-container'>
            <h2>Let's Noteit!</h2>
            <div >
                <input placeholder='Username' type='text' name='username' onChange={handleChange} />
                <input placeholder='Email' type='email' name='email' onChange={handleChange} />
                <input placeholder='Password' type='password' name='password' onChange={handleChange} />
                <button className='btn' onClick={handleRegister}>Register</button>
                <div className='form__subtext'>
                    <p>Already have an account? login <a href='/login'>here</a></p>
                </div>
            </div>
        </form>
    )
}

export default Register