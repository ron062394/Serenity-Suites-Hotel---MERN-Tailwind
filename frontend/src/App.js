import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/user/HomePage';
import UserSignup from './pages/user/UserSignup';
import UserLogin from './pages/user/UserLogin';
import Facilities from './pages/user/Facilities';
import Rooms from './pages/user/Rooms';
import ContactUs from './pages/user/ContactUs';
import './App.css';
import Footer from './components/Footer';
import Events from './pages/user/Events';
import Dining from './pages/user/Dining';
import Booking from './pages/user/Booking';

function App() {
  return (
    <div className="App bg-black min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<UserSignup />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/booking" element={<Booking />} />
            
            {/* Additional Routes */}
          </Routes>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
