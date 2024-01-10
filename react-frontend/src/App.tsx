import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const getInitialState = () => {
    const savedState = localStorage.getItem("isLoggedIn");
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
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
