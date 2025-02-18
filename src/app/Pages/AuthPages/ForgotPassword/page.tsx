"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password | AlayTrabaho";
  }, []); 

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
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
            <a href="../AuthPages/SignUp"> Sign Up </a>  
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="flex items-center justify-between w-full max-w-6xl">
          {/* Left Image */}
          <div className="hidden md:block w-1/4">
                <img
                  src="/assets/img/SearchJob.png"  // Replace this with the actual image path
                  alt="User Icon"
                  className="w-600 h-600 object-contain transform hover:scale-110 transition-transform duration-300 absolute inset-x-0 top-20"
                /> 
          </div>

          {/* Forgot Password Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
              <p className="text-gray-500 text-sm">
                Enter your email address to receive a password reset code
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           placeholder-gray-400 text-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg relative overflow-hidden group
                         transition-all duration-300 hover:bg-blue-600 active:scale-95 disabled:opacity-70"
              >
                <span className={`absolute inset-0 w-0 bg-blue-400 transition-all duration-[750ms] ease-out group-hover:w-full ${isLoading ? 'animate-pulse' : ''}`}></span>
                <span className="relative">
                  {isLoading ? 'Sending Code...' : 'Send Code'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full mt-4 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 
                         transition-colors duration-300 group"
              >
                <FontAwesomeIcon 
                  icon={faArrowLeft} 
                  className="transform group-hover:-translate-x-1 transition-transform duration-300"
                />
                <a href="../AuthPages/LogIn"> Back to Login </a> 
              </button>
            </form>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-1/4">
                <img
                  src="/assets/img/ResumeUserLogo.png"  // Replace this with the actual image path
                  alt="User Icon"
                  className="w-600 h-600 object-contain transform hover:scale-110 transition-transform duration-300 absolute inset-x-23 top-10" 
                /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;