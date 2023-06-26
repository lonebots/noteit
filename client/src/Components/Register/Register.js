import React, { useState } from 'react'
import url from '../../API/Url.js'
import axios from 'axios'

function Register() {
    console.log("REGISTER RENDERED")
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
        }
        else {
            alert(`User registraction failed reason : ${data.error}`)
        }
        console.log(data)

    }

    return (
        <div className='register-container'>
            <h3>Start Making Notes!</h3>
            <div className='register__form'>
                <input placeholder='Username' type='text' name='username' onChange={handleChange} />
                <input placeholder='Email' type='email' name='email' onChange={handleChange} />
                <input placeholder='Password' type='password' name='password' onChange={handleChange} />
                <button className='btn' onClick={handleRegister}>Register</button>
                <div className='login__subtext'>
                    <p>Already have an account? login <a href='/login'>here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register