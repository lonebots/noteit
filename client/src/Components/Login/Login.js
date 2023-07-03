import React, { useState } from 'react'
import axios from 'axios'
import baseURL from '../../API/Url.js'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ setIsLogged, isLogged }) => {
    const navigate = useNavigate(); // navigation hook
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const loginRequest = async () => {
        const url = baseURL + "/user/login"
        try {
            return await axios.post(url, user)
        }
        catch (error) {
            return error.response
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await loginRequest()
        if (data.success) {
            setIsLogged(true)
            alert("Login success")
            localStorage.setItem('access-token', data.accessToken)
            localStorage.setItem('is-logged', true)
            navigate('/dash')
        }
        else {
            alert("Login failed")
        }
    }

    return (
        <form className='form'>
            <h2>welcome back!</h2>
            <input placeholder='Email' type='email' name='email' onChange={handleChange} />
            <input placeholder='Password' type='password' name="password" onChange={handleChange} />
            <button className='btn' onClick={handleSubmit} >Login</button>
            <div className='form__subtext'>
                <p>Don't an account? please register <a href='/register'> here</a></p>
            </div>
        </form >
    )
}

export default Login