import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/user/HomePage';
import UserSignup from './pages/user/UserSignup';
import UserLogin from './pages/user/UserLogin';
import Header from './components/Header'

import './App.css';

function App() {
  return (
    <div className="App container mx-auto">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/register' element={<UserSignup/>}></Route>
          <Route path='/login' element={<UserLogin/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
