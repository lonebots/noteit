import React, { useState } from 'react'

function Register() {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserData(
            { ...userData, [e.target.name]: e.target.value }
        )
    }

    return (
        <div className='register-container'>
            <h3>Start Making Notes!</h3>
            <div className='register__form'>
                <input placeholder='Email' type='email' name='email' onChange={handleChange} />
                <input placeholder='Password' type='password' />
                <button className='btn' >Register</button>
                <div className='login__subtext'>
                    <p>Already have an account? login <a href='/login'>here</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register