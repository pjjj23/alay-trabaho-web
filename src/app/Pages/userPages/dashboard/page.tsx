"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faRightFromBracket, faHome } from '@fortawesome/free-solid-svg-icons';

const JobListingsPage = () => {
    useEffect(() => {
      document.title = "User Dashboard | AlayTrabaho";
    }, []); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [filters, setFilters] = useState({
    workSchedule: [],
    experienceLevel: [],
    workSetup: []
  });

  const jobListings = [
    {
      id: 1,
      company: 'RAFI MFI Inc',
      position: 'Senior UI/UX Designer',
      location: 'Sto Nino, Cebu City',
      salary: 'P516',
      date: 'February 12, 2021',
      type: ['Full time', 'Full time', 'Full time'],
      color: 'bg-violet-100'
    },
    {
      id: 2,
      company: 'RAFI MFI Inc',
      position: 'Senior UI/UX Designer',
      location: 'Sto Nino, Cebu City',
      salary: 'P516',
      date: 'February 12, 2021',
      type: ['Full time', 'Full time', 'Full time'],
      color: 'bg-green-100'
    },
    {
        id: 3,
        company: 'RAFI MFI Inc',
        position: 'Senior UI/UX Designer',
        location: 'Sto Nino, Cebu City',
        salary: 'P516',
        date: 'February 12, 2021',
        type: ['Full time', 'Full time', 'Full time'],
        color: 'bg-yellow-100'
      },
      {
        id: 4,
        company: 'RAFI MFI Inc',
        position: 'Senior UI/UX Designer',
        location: 'Sto Nino, Cebu City',
        salary: 'P516',
        date: 'February 12, 2021',
        type: ['Full time', 'Full time', 'Full time'],
        color: 'bg-red-100'
      },
      {
        id: 5,
        company: 'RAFI MFI Inc',
        position: 'Senior UI/UX Designer',
        location: 'Sto Nino, Cebu City',
        salary: 'P516',
        date: 'February 12, 2021',
        type: ['Full time', 'Full time', 'Full time'],
        color: 'bg-blue-100'
      },
      {
        id: 6,
        company: 'RAFI MFI Inc',
        position: 'Senior UI/UX Designer',
        location: 'Sto Nino, Cebu City',
        salary: 'P516',
        date: 'February 12, 2021',
        type: ['Full time', 'Full time', 'Full time'],
        color: 'bg-green-100'
      },
      {
        id: 7,
        company: 'RAFI MFI Inc',
        position: 'Senior UI/UX Designer',
        location: 'Sto Nino, Cebu City',
        salary: 'P516',
        date: 'February 12, 2021',
        type: ['Full time', 'Full time', 'Full time'],
        color: 'bg-yellow-100'
      },
      {
        id: 8,
        company: 'RAFI MFI Inc',
        position: 'Senior UI/UX Designer',
        location: 'Sto Nino, Cebu City',
        salary: 'P516',
        date: 'February 12, 2021',
        type: ['Full time', 'Full time', 'Full time'],
        color: 'bg-red-100'
      },

  ];

  const JobCard = ({ job }) => (
    <div className={`${job.color} rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600">{job.date}</p>
          <p className="text-gray-700 mt-2">{job.company}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-4">{job.position}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.type.map((type, index) => (
          <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
            {type}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-600 text-sm">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          <span>{job.location}</span>
        </div>
        <p className="text-gray-700 font-semibold">{job.salary}</p>
      </div>
      
      <a href="../userPages/ApplyJob"><button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 w-full">
         Details 
      </button></a>
    </div>
  );

  const handleLogout = () => {
    setShowLogoutModal(false);
    setShowDropdown(false);
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
            onClick={handleLogout}
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
              className="w-10 h-10 rounded-full top-4 right-8 absolute"
            />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-16 w-56 bg-gray-800 rounded-lg shadow-lg py-2 transition-all duration-300">
              <a href="../userPages/dashboard"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-white" />
                 <span className="text-white">Home</span> 
              </button></a>

              <a href="../userPages/UserSettings"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                 <span className="text-white">Profile</span> 
              </button></a>
              
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

      <main className="container mx-auto px-4 py-8 pt-24">
  <h2 className="text-2xl font-bold text-gray-800 mb-8">Recommended Jobs</h2>

  <div className="flex gap-8">
    {/* Filters Sidebar */}
    <div className="w-64 flex-shrink-0 h-screen sticky top-24 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        {/* Work Schedule */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Work Schedule</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {Array(10).fill('Full time').concat(['Part time', 'Internship', 'Contract']).map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-sm text-gray-600 group-hover:text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Experience Level</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {Array(8).fill('Entry Level').concat(['No Experience', 'Associate', 'Mid-Senior Level', 'Senior Level']).map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-sm text-gray-600 group-hover:text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Work Setup */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Work Setup</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {Array(6).fill('Remote').concat(['Hybrid', 'On-site']).map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-sm text-gray-600 group-hover:text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Job Listings Grid */}
    <div className="flex-1 overflow-y-auto max-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobListings.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  </div>
</main>
    </div> 
  );
};

export default JobListingsPage;