"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope,
  faUser,
  faLock,
  faPhone,
  faIdCard,
  faUserTag,
  faEye
} from '@fortawesome/free-solid-svg-icons';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign Up | AlayTrabaho";
  }, []); 

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const roles = [  
    'Applicant',
    'Recruiter'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
        <div className="flex items-center cursor-pointer group">
        <img
              src="/assets/img/Logo.png"
              alt="AlayTrabaho Logo"
              className="w-8 h-8 object-contain opacity-0 animate-fade-in mr-3"
            />
          <h1 className="text-2xl font-bold transition-transform duration-300 ease-in-out transform group-hover:scale-105">
            Alay<span className="text-blue-600">TRABAHO</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
            <a href="../AuthPages/LogIn" className="relative z-10">Login</a>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"></span>
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300 
                           hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 
                           active:scale-95 transform">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-20 mt-[15px]">
        <div className="flex items-center justify-between w-full max-w-6xl">
          {/* Left Image */}
          <div className="hidden md:block w-1/4">
                <img
                  src="/assets/img/SearchJob.png"  // Replace this with the actual image path
                  alt="User Icon"
                  className="w-600 h-600 object-contain transform hover:scale-110 transition-transform duration-300 absolute inset-x-0 inset-y-11"
                /> 
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-500 text-sm">
                Join us and start your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faUser} 
                    className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                             focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                             placeholder-gray-400 text-gray-700"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                             focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                             placeholder-gray-400 text-gray-700"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                             focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                             placeholder-gray-400 text-gray-700"
                  />
                </div>
              </div>

              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           placeholder-gray-400 text-gray-700"
                />
              </div>

              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           placeholder-gray-400 text-gray-700"
                />
              </div>

              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           placeholder-gray-400 text-gray-700"
                />
              </div>

              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faUserTag} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           text-gray-700 appearance-none cursor-pointer"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg relative overflow-hidden group
                         transition-all duration-300 hover:bg-blue-600 active:scale-95 disabled:opacity-70"
              >
                <span className={`absolute inset-0 w-0 bg-blue-400 transition-all duration-[750ms] ease-out group-hover:w-full ${isLoading ? 'animate-pulse' : ''}`}></span>
                <span className="relative">
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </span>
              </button>

              <div className="text-center mt-6">
                <span className="text-gray-600 text-sm">Already have an account? </span>
                <a href="../AuthPages/LogIn" className="text-blue-500 text-sm hover:text-blue-700 transition-colors duration-300 font-medium">
                  Login
                </a>
              </div>
            </form>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-1/4">
                <img
                  src="/assets/img/ResumeUserLogo.png"  // Replace this with the actual image path
                  alt="User Icon"
                  className="w-600 h-600 object-contain transform hover:scale-110 transition-transform duration-300 absolute inset-x-15 top-10" 
                />  
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;