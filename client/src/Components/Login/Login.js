import React, { useState } from 'react'
import axios from 'axios'
import baseURL from '../../API/Url.js'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLogged, isLogged }) => {
    console.log("LOGIN RENDERED")
    const navigate = useNavigate(); // navigation hook
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    // todo : axios post request - (url, object, callback)
    const loginRequest = async () => {
        const url = baseURL + "/user/login"
        try {
            return await axios.post(url, user)
        }
        catch (error) {
            console.log(error)
            return error.response
        }
    }


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await loginRequest()
        console.log('data login : ', data)
        if (data.success) {
            console.log("login islogged first : ", isLogged)
            setIsLogged(true)
            console.log("login islogged second : ", isLogged)
            alert("Login success")
            console.log("access-token : ", data.accessToken)
            localStorage.setItem('access-token', data.accessToken)
            localStorage.setItem('is-logged', true)
            navigate('/dash')
        }
        else {
            alert("Login failed")
        }
    }

    return (
        <div className='login-container'>
            <h3>welcome back!</h3>
            <div className='login__form'>
                <input placeholder='Email' type='email' name='email' onChange={handleChange} />
                <input placeholder='Password' type='password' name="password" onChange={handleChange} />
                <button className='btn' onClick={handleSubmit} >Login</button>
            </div>
            <div className='form__subtext'>
                <p>Don't an account? please register <a href='/register'> here</a></p>
            </div>
        </div>
    )
}

export default Login