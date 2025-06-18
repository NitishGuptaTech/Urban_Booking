import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SlotBooking from './pages/SlotBooking';
import ReviewBooking from './pages/ReviewBooking';
import SlotCard from './components/SlotCard';

import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <SlotCard time={''} available={false} onClick={function (): void {
          throw new Error('Function not implemented.');
        } } selected={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SlotBooking" element={<SlotBooking />} />
          <Route path="/ReviewBooking" element={<ReviewBooking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
