import React, { useState, useEffect } from 'react';
import {
  FaEdit,
  FaCheck,
  FaUpload,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaUserCircle,
  FaBirthdayCake,
  FaVenusMars,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Nitish Gupta',
    email: 'Nitish.wendor@hmail.com',
    phone: '9485748750',
    address: 'Bahadurgarh, Haryana, India',
    photo: '',
    dob: '1999-10-15',
    gender: 'Male',
  });

  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (editing) {
      setProfile(tempProfile);
    }
    setEditing(!editing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen p-6 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-100 to-purple-200 text-black'}`}>
      <div className={`shadow-xl rounded-2xl p-8 w-full max-w-3xl transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center w-full text-blue-700 dark:text-shadow-blue-500">User Profile</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition"
            title="Toggle Dark/Light Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
            />
          ) : (
            <FaUserCircle className={`w-32 h-32 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          )}
          <label className="mt-3 flex items-center cursor-pointer text-blue-600 hover:text-blue-800 dark:text-shadow-blue-500 transition">
            <FaUpload className="mr-2" />
            Upload Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <div className="space-y-5">
          {[
            { icon: <FaUserCircle />, name: 'name', type: 'text', label: profile.name },
            { icon: <FaEnvelope />, name: 'email', type: 'email', label: profile.email },
            { icon: <FaPhone />, name: 'phone', type: 'text', label: profile.phone },
            { icon: <FaHome />, name: 'address', type: 'text', label: profile.address },
            { icon: <FaBirthdayCake />, name: 'dob', type: 'date', label: profile.dob },
          ].map(({ icon, name, type, label }) => (
            <div key={name} className="flex items-center space-x-3">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{icon}</span>
              {editing ? (
                <input
                  name={name}
                  type={type}
                  value={tempProfile[name as keyof typeof tempProfile]}
                  onChange={handleChange}
                  className={`border rounded px-3 py-1 flex-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                />
              ) : (
                <span className={`${darkMode ? 'text-white' : 'text-black'} text-base`}>
                  {name === 'dob' ? `DOB: ${label}` : label}
                </span>
              )}
            </div>
          ))}

          {/* Gender Dropdown */}
          <div className="flex items-center space-x-3">
            <FaVenusMars className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            {editing ? (
              <select
                name="gender"
                value={tempProfile.gender}
                onChange={handleChange}
                className={`border rounded px-3 py-1 flex-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className={`${darkMode ? 'text-white' : 'text-black'} text-base`}>
                Gender: {profile.gender}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleEditToggle}
            className={`px-5 py-2 rounded text-white font-semibold shadow-md transition duration-200
              ${editing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {editing ? (
              <span className="flex items-center">
                <FaCheck className="mr-2" /> Save Changes
              </span>
            ) : (
              <span className="flex items-center">
                <FaEdit className="mr-2" /> Edit Profile
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
