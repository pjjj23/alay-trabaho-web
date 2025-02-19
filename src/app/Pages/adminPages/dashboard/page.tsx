"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEllipsisV, 
  faMapMarkerAlt, 
  faPlus,
  faHome, 
  faUser, 
  faLocationDot, 
  faRightFromBracket,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// JobCard Component
const JobCard = ({ colorScheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className={`w-full h-full rounded-xl p-6 ${colorScheme.bg}`}>
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-gray-600">February 12, 2021</span>
          <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-600 hover:text-gray-800 p-1"
            >
              <FontAwesomeIcon icon={faEllipsisV} className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      console.log('Edit clicked');
                      setIsDropdownOpen(false);
                    }}
                  > 
                    Edit
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      console.log('Remove clicked');
                      setIsDropdownOpen(false);
                    }}
                  > 
                    Remove
                  </button>
                </div>
              </div>
            )}
        </div> 
        <div className="mb-2">
          <span className="text-sm text-gray-600">RAFI MFI Inc</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Senior UI/UX Designer
        </h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {Array(3).fill('Full-time').map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${colorScheme.tagBg} ${colorScheme.tagText}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col items-start text-gray-600">
            <span className="text-sm font-bold">P516</span>
            <span className="text-sm">Sto Niño, Cebu City</span>
          </div>

          <a href="../adminPages/JobInfo"><button 
            className="px-8 py-2 rounded-full text-sm font-medium bg-gray-800 text-white hover:bg-gray-700"
          >
            Details
          </button></a>
        </div>
      </div>
    </div>
  );
};

// AddJobModal Component
const AddJobModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    hiringPosition: '',
    salary: '',
    street: '',
    barangay: '',
    cityMunicipality: '',
    province: '',
    country: '',
    postalCode: '',
    landmark: '',
    workSchedule: '',
    workSetup: '',
    experienceLevel: '',
    jobDescription: '',
    jobResponsibilities: '',
    qualifications: ['', '', '']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQualificationChange = (index, value) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index] = value;
    setFormData(prev => ({
      ...prev,
      qualifications: newQualifications
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Post a Job</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Hiring Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hiring Position:
              </label>
              <input
                type="text"
                name="hiringPosition"
                value={formData.hiringPosition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Software Developer"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary:
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="₱10,000"
              />
            </div>

            {/* Address Fields */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="barangay"
                  placeholder="Barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="cityMunicipality"
                  placeholder="City/Municipality"
                  value={formData.cityMunicipality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                name="landmark"
                placeholder="landmark/other details"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Qualifications:
              </label>
              {formData.qualifications.map((qual, index) => (
                <input
                  key={index}
                  type="text"
                  value={qual}
                  onChange={(e) => handleQualificationChange(index, e.target.value)}
                  placeholder="Enter qualification here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ))}
              <button 
                type="button"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                ADD
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Work Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Schedule:
              </label>
              <select
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select work schedule</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            {/* Work Setup */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Setup:
              </label>
              <select
                name="workSetup"
                value={formData.workSetup}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select work setup</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="OnSite">On-site</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level:
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select experience level</option>
                <option value="NoExp">No Experience</option>
                <option value="EntryLevel">Entry Level</option>
                <option value="Associate">Associate</option>
                <option value="MidSenLevel">Mid-Senior Level</option>
                <option value="SenLevel">Senior Level</option>
              </select>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description:
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter description here..."
              />
            </div>

            {/* Job Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Responsibilities:
              </label>
              <textarea
                name="jobResponsibilities"
                value={formData.jobResponsibilities}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter description here..."
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              POST JOB
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// LogoutModal Component
const LogoutModal = ({ setShowLogoutModal, setShowDropdown }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96">
      <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
      <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
      <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
      <div className="flex justify-end gap-4">
        <button 
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button 
          onClick={() => {
            setShowLogoutModal(false);
            setShowDropdown(false);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

// Main JobListings Component
const JobListings = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard | AlayTrabaho";
  }, []);

  const colorSchemes = [
    {
      bg: 'bg-gray-50',
      tagBg: 'bg-white',
      tagText: 'text-black'
    },
    {
      bg: 'bg-green-50',
      tagBg: 'bg-white',
      tagText: 'text-black'
    },
    {
      bg: 'bg-orange-50',
      tagBg: 'bg-white',
      tagText: 'text-black'
    },
    {
      bg: 'bg-yellow-50',
      tagBg: 'bg-white',
      tagText: 'text-black'
    },
    {
      bg: 'bg-rose-50',
      tagBg: 'bg-white',
      tagText: 'text-black'
    },
    {
      bg: 'bg-lime-50',
      tagBg: 'bg-white',
      tagText: 'text-black'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
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
                    className="w-10 h-10 rounded-full top-4 right-8 absolute"
                  />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 top-16 w-56 bg-gray-800 rounded-lg shadow-lg py-2 transition-all duration-300">
                    <a href="../adminPages/dashboard"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                      <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-white" />
                       <span className="text-white">Home</span> 
                    </button></a>
      
                    <a href="../adminPages/adminSettings"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                       <span className="text-white">Profile</span> 
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Jobs Posted</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorSchemes.map((scheme, index) => (
            <JobCard key={index} colorScheme={scheme} />
          ))}
        </div>
      </main>

      {/* Fixed Add Button */}
      <button 
        onClick={() => setShowAddJobModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 rounded-full shadow-lg 
          flex items-center justify-center text-white hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faPlus} className="w-6 h-6" />
      </button>

      {/* Modals */}
      {showLogoutModal && (
        <LogoutModal 
          setShowLogoutModal={setShowLogoutModal}
          setShowDropdown={setShowDropdown}
        />
      )}
      
      <AddJobModal 
        isOpen={showAddJobModal}
        onClose={() => setShowAddJobModal(false)}
      />
    </div>
  );
};

export default JobListings;

