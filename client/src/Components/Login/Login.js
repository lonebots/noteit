import React, { useState } from 'react'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const handleSubmit = () => {
        console.log(user)
    }
    return (
        <div className='login-container'>
            <h3>welcome back!</h3>
            <div className='login__form'>
                <input placeholder='Email' type='email' name='email' onChange={handleChange} />
                <input placeholder='Password' type='password' />
                <button className='btn' onClick={handleSubmit} >Login</button>
            </div>
            <div className='form__subtext'>
                <p>Don't an account? please register <a href='/register'> here</a></p>
            </div>
        </div>
    )
}

export default Login