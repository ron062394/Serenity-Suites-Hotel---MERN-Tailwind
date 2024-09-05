import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUser, FaInfoCircle, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://serenity-suites-api.vercel.app/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'LOGIN', payload: data.user });
        toast.success('Login successful');
        navigate('/admin/');
      } else {
        setError(data.error || 'Login failed');
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderLogo = () => (
    <motion.div 
      className="font-serif text-3xl text-emerald-800 mb-10 text-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <span className="italic text-white">Serenity</span>
      <span className="text-amber-500 italic">Suites</span>
    </motion.div>
  );

  const renderDemoCredentials = () => (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md mb-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p className="font-bold flex items-center"><FaInfoCircle className="mr-2" /> Demo Credentials</p>
        <p>Username: <strong>adminuser</strong></p>
        <p>Password: <strong>adminpassword123</strong></p>
      </div>
    </motion.div>
  );

  const renderInputField = (id, label, icon, type = 'text') => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {icon} {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
        id={id}
        name={id}
        type={type}
        placeholder={`Enter your ${id}`}
        value={formData[id]}
        onChange={handleInputChange}
        required
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-800 flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="w-full max-w-md">
        {renderLogo()}

        <motion.div
          className="bg-white p-8 rounded-lg shadow-xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold mb-8 text-emerald-800 text-center"><FaUserShield className="inline-block mr-2" />Admin Login</h2>
          <form onSubmit={handleSubmit}>
            {renderInputField('username', 'Username', <FaUser className="inline-block mr-2" />)}
            {renderInputField('password', 'Password', <FaLock className="inline-block mr-2" />, 'password')}
            {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg"
                type="submit"
              >
                <FaSignInAlt className="mr-2" />
                <span>Sign In</span>
              </motion.button>
            </div>
            {renderDemoCredentials()}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLogin;
