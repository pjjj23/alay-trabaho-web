"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as router, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faRightFromBracket, faHome, faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const JobApplicationsDashboard = () => { 
    useEffect(() => {
            document.title = "Manage Applied Jobs | AlayTrabaho";
          }, []); 
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [applications, setApplications] = useState([
    { id: 1, company: 'Enigma Tech Corp', position: 'Senior Software Developer', date: 'February 13, 2025', status: 'Pending' },
    { id: 2, company: 'Enigma Tech Corp', position: 'Senior Software Developer', date: 'February 13, 2025', status: 'Approved' },
    { id: 3, company: 'Enigma Tech Corp', position: 'Senior Software Developer', date: 'February 13, 2025', status: 'Rejected' },
    { id: 4, company: 'Enigma Tech Corp', position: 'Senior Software Developer', date: 'February 13, 2025', status: 'Pending' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const LogoutModal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 transform transition-all duration-300">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
          <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setShowLogoutModal(false);
                setShowDropdown(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50">
        {showLogoutModal && <LogoutModal />}
        {/* Header */}
              <header className="flex justify-between items-center px-8 py-5 bg-white fixed w-full shadow-sm z-10">
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
                <div className="flex items-center">
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <img 
                      src="/assets/img/default-profileimg.png"
                      className="w-10 h-10 rounded-full top-4 right-8 absolute object-cover"
                    />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 top-16 w-56 bg-gray-800 rounded-lg shadow-lg py-2 transition-all duration-300">
                      <a href="../userPages/dashboard">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                          <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-white" />
                          <span className="text-white">Home</span> 
                        </button>
                      </a>
        
                      <a href="../userPages/UserSettings">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                          <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                          <span className="text-white">Profile</span> 
                        </button>
                      </a>
                      
                      <a href="../userPages/ManageJob"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                                      <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-white" />
                                      <span className="text-white">Manage Job Applied</span>
                                    </button></a>
                      
                      <div className="border-t border-gray-200 my-1"></div>
                      
                      <button 
                        className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 text-red-600"
                        onClick={() => {
                          setShowLogoutModal(true);
                          setShowDropdown(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </header>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
            <div className="text-sm text-gray-500">
              Total Applications: {applications.length}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Header Row */}
          <div className="grid grid-cols-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
            <div>Company Name</div>
            <div>Job Title</div>
            <div>Date Applied</div>
            <div>Status</div>
          </div>

          {/* Application Rows */}
          {applications.map((app) => (
            <div
              key={app.id}
              className="grid grid-cols-4 px-6 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon 
                  icon={faBuilding} 
                  className="text-gray-400 w-4 h-4 group-hover:text-blue-500 transition-colors"
                />
                <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {app.company}
                </span>
              </div>

              <div className="text-gray-700">{app.position}</div>
              
              <div className="text-gray-500">{app.date}</div>

              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)} transition-all duration-200 group-hover:scale-105`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsDashboard;