import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://admin.wendor.in/_next/static/media/android-icon-144x144.4c30ee29.png"
            alt="Logo"
            className="h-8 w-8 object-cover"
          />
          <h1 className="text-lg font-bold">Urban Booking</h1>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/Home" className=" hover:text-red-500">Home</Link>
          <Link to="/SlotBooking" className=" hover:text-red-500">Bookings</Link>
          <Link to="/ReviewBooking" className=" hover:text-red-500">Review</Link>
        </div>

        {/* Right: Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-1 hover:text-red-500">
            <UserCircleIcon className="w-6 h-6" />
            <ChevronDownIcon className="w-4 h-4" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-1 z-50">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`block px-4 py-2 text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => alert("Logout clicked")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
