import './App.css';

import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/pages/Login'
import Welcome from './components/pages/Welcome'
import Register from './components/pages/Register'
import Profile from './components/pages/Profile'
import jwt_decode from 'jwt-decode'

function App() {
  // state the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)
  // useEffect that handles localstorage if the user navigates away from the page/refreshes
  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      // if a token is found, log the user in, otherwise make sure they are logged out
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])
  // logout handler function that deletes a token from local storage
  const handleLogout = () => {
    // remove the token from local storage
    if (localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    // set the user state to be null
    setCurrentUser(null)
  }
  return (
    <Router>
      <Navbar handleLogout={handleLogout} currentUser={currentUser} />
      <div className="App">
        <Routes>
          <Route
            exact path='/'
            element={<Welcome />}
          />
          <Route
            path='/login'
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* <Route
            path='/profile'
            element={<Profile />}
          /> */}

          <Route
            path='/profile'
            element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to='/login' />}
          />

          <Route
            path='/register'
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
