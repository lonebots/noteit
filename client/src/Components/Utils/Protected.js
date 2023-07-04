import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ isLogged, children }) => {

    useEffect(() => {
        const isLogged = localStorage.getItem('is-logged')
    }, [isLogged])

    if (isLogged === false) {
        return <Navigate to='/login' />
    } else {
        return children;
    }
}
export default Protected