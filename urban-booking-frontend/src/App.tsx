import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SlotBooking from './pages/SlotBooking';
import ReviewBooking from './pages/ReviewBooking';
import Home from './pages/Home';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SlotBooking" element={<SlotBooking />} />
          <Route path="/ReviewBooking" element={<ReviewBooking />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>

        {/* Toast Notification Support */}
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
};

export default App;
