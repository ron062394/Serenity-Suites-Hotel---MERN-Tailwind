import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Styles
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// User Pages
import HomePage from './pages/user/HomePage';
import UserSignup from './pages/user/UserSignup';
import UserLogin from './pages/user/UserLogin';
import Facilities from './pages/user/Facilities';
import Rooms from './pages/user/Rooms';
import ContactUs from './pages/user/ContactUs';
import Events from './pages/user/Events';
import Dining from './pages/user/Dining';
import Booking from './pages/user/Booking';
import RoomDetails from './pages/user/RoomDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageRooms from './pages/admin/ManageRooms';
import ManageUsers from './pages/admin/ManageUsers';
import Notifications from './pages/admin/Notifications';
import AdminLogin from './pages/admin/AdminLogin';


function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App bg-black min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
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
          <Route path="/rooms/:id" element={<RoomDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/" element={<AdminDashboard />} />
          <Route path="/admin/manage-rooms" element={<ManageRooms />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/notifications" element={<Notifications />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
