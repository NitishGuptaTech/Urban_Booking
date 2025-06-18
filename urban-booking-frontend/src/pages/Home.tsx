import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-full text-gray-800">

      {/* Hero Section - No Image */}
      <div className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Urban Booking</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          A simple and smart way to book your service time slots — quick, reliable, and hassle-free.
        </p>
        <Link
          to="/SlotBooking"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition"
        >
          Book a Slot Now
        </Link>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Urban Booking?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 p-6 rounded shadow hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Easy Scheduling</h3>
            <p>Pick your desired time slot in seconds — no calls, no waiting.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded shadow hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Live Availability</h3>
            <p>Only book from what's really available — no false promises.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded shadow hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Fast Confirmation</h3>
            <p>Instant confirmation and easy cancellation at your fingertips.</p>
          </div>
        </div>
      </div>

      {/* Steps to Book */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-4xl font-bold text-blue-600">1</span>
              <h4 className="font-semibold mt-2">Select Service</h4>
              <p className="text-sm text-gray-600">Choose the service you need.</p>
            </div>
            <div>
              <span className="text-4xl font-bold text-blue-600">2</span>
              <h4 className="font-semibold mt-2">Pick a Time</h4>
              <p className="text-sm text-gray-600">Select your preferred time slot.</p>
            </div>
            <div>
              <span className="text-4xl font-bold text-blue-600">3</span>
              <h4 className="font-semibold mt-2">Confirm & Relax</h4>
              <p className="text-sm text-gray-600">Get confirmation and enjoy the service.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
        <Link
          to="/SlotBooking"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
