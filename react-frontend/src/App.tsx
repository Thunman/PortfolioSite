import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';

function App() {

  const getInitialState = () => {
    const savedState = localStorage.getItem("isLoggedIn");
    console.log(savedState)
    return savedState !== null ? JSON.parse(savedState) : false;
    
  }

  const [isLoggedIn, setIsLoggedIn] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);


  return (
    <div className="App">
      <Router>
        {!isLoggedIn && (
          <Routes>
            <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='/register' element={<Register />} />
            
          </Routes>
        )}
        {isLoggedIn && (
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
