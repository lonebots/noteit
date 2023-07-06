import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Nav from './Components/Nav/Nav';
import AddNote from './Components/Notes/AddNote';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import UpdateNote from './Components/Notes/UpdateNote';
import Protected from './Components/Utils/Protected';
import axios from 'axios';
import url from './API/Url';

function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"))

  // header config
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access-token')}`
    }
  };

  const verifyrequest = async () => {
    const baseURL = url + '/user/verify'
    try {
      return await axios.get(baseURL, config)
    } catch (error) {
      return error.response
    }
  }

  // to check if user is logged in 
  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await verifyrequest();
      if (data.success && !data.expired) {
        setIsLogged(true)
        localStorage.setItem('is-logged', true)
      } else {
        localStorage.removeItem('access-token')
        setIsLogged(false)
        localStorage.setItem('is-logged', false)
      }
    }
    checkLogin();
  }, [])

  return (
    <div className='App'>
      <Nav isLogged={isLogged} setIsLogged={setIsLogged} />
      <div className='main'>
        <Routes>
          <Route exact path="/" element={<Home isLogged={isLogged} />} />
          <Route path='/login' element={<Login setIsLogged={setIsLogged} isLogged={isLogged} />} />
          <Route path='/register' element={<Register />} />
          <Route path="/dash" element={<Protected isLogged={isLogged}><Dashboard /></Protected>} />
          <Route path="/note/new" element={<Protected isLogged={isLogged}><AddNote /></Protected>} />
          <Route path="/user/update-note/:id" element={<Protected isLogged={isLogged}><UpdateNote /> </Protected>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;