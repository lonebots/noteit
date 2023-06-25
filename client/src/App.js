import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Nav from './Components/Nav/Nav';
import AddNote from './Components/Notes/AddNote';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import UpdateNote from './Components/Notes/UpdateNote';

function App() {

  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("access-token")
    if (token) {
      setIsLogged(true)
    }
  }, [isLogged])

  return (
    <div className="App">

      <Nav isLogged={isLogged} setIsLogged={setIsLogged} />
      {/* {
        isLogged ?
          // <Navigate to="/user/dashboard" />
          <></>
          :
          <Home />
      } */}

      <Routes>
        <Route exact path="/note/new" element={<AddNote />} />
        <Route path="/user/update-note/:id" element={<UpdateNote />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;