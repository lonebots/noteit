import React from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ isLogged, children }) => {
    const navigate = useNavigate()
    if (!isLogged) {
        navigate('/login')
    } else {
        return children;
    }
}
export default Protected