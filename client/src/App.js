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
  console.log("APP RENDERED")
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged") || false)

  const verifyrequest = async () => {
    const baseURL = url + '/user/verify'
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    };
    try {
      return await axios.get(baseURL, config)
    } catch (error) {
      return error.response
    }
  }
  console.log("islogged before useeffect : ", isLogged)
  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await verifyrequest();
      console.log("data : ", data)
      if (data.success && !data.expired) {
        console.log("logged in ")
        setIsLogged(true)
        localStorage.setItem('is-logged', true)
      } else {
        console.log("not logged in")
        localStorage.removeItem('access-token')
        setIsLogged(false)
        localStorage.setItem('is-logged', false)
      }

    }
    checkLogin()
    console.log("islogged after useeffect : ", isLogged)
  }, [isLogged, setIsLogged])

  return (
    <div className="App">

      <Nav isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login setIsLogged={setIsLogged} isLogged={isLogged} />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dash" element={<Protected isLogged={isLogged}><Dashboard /></Protected>} />
        <Route exact path="/note/new" element={<Protected isLogged={isLogged}><AddNote /></Protected>} />
        <Route path="/user/update-note/:id" element={<Protected isLogged={isLogged}><UpdateNote /> </Protected>} />


      </Routes>

    </div>
  );
}

export default App;