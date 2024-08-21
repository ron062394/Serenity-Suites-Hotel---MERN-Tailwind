import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/user/HomePage';
import UserSignup from './pages/user/UserSignup';
import UserLogin from './pages/user/UserLogin';
import Facilities from './pages/user/Facilities'
import Rooms from './pages/user/Rooms'
import ContactUs from './pages/user/ContactUs';
import './App.css';



function App() {
  return (
    <div className="App bg-black">
      <div className=''>
        <Router>
          <Header/>
          <Routes>
            {/* User Routes */}
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/register' element={<UserSignup/>}></Route>
            <Route path='/facilities' element={<Facilities/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
            <Route path='/rooms' element={<Rooms/>}></Route>
            <Route path='/contact-us' element={<ContactUs/>}></Route>


            {/* User Routes */}

          </Routes>
        </Router>
      </div>

    </div>
  );
}

export default App;
