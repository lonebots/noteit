import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isLogged, children }) {
    console.log("PROTECTED RENDERED")
    console.log("protected islogged value : ", isLogged)
    isLogged = localStorage.getItem('is-logged')
    if (!isLogged) {
        return (
            <Navigate to='/register' />
        )
    } else
        return children;

}

export default Protected