"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faEnvelope, 
  faMapMarkerAlt, 
  faDollarSign, 
  faUsers, 
  faChevronLeft, 
  faPaperPlane,
  faCircle, faLocationDot, faRightFromBracket, faHome, faUser
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const JobPostingCard = () => {
  const [isVisible, setIsVisible] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);

useEffect(() => {
    setIsVisible(true);
    document.title = "Apply | AlayTrabaho";
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
        {showLogoutModal && <LogoutModal />}
         
        <header className="flex justify-between items-center px-8 py-50 bg-white top-0 fixed w-full shadow-sm z-10">
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
  <div className="relative flex items-center">
    <button
      className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <img
        src="/assets/img/default-profileimg.png"
        className="w-10 h-10 rounded-full"
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

        <a href="../userPages/ManageJob">
          <button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-white" />
            <span className="text-white">Manage Job Applied</span>
          </button>
        </a>

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

      <div 
        className={`max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-20' : 'opacity-0 translate-y-20'
        }`}
      >
        {/* Header Section */}
        <div className="bg-blue-100 p-8">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500 h-12 w-12 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  L
                </div>
                <h2 className="text-lg font-medium">Lorem Ipsum Corporation</h2>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Senior UI/UX Designer</h1>
              <div className="flex flex-wrap gap-2">
                {['Full-time', 'Remote', 'Senior Level'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 bg-blue-200 text-blue-700 rounded-full text-sm transition-transform hover:scale-105 duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-gray-800">₱110,000</div>
              <div className="flex items-center justify-end space-x-2 text-gray-600">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                <span>Sto. Niño, Cebu City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Qualifications</h3>
              <ul className="space-y-3">
                {[
                  '3+ years in a similar role with a strong UI design portfolio.',
                  'Experience in app, desktop, and web design.',
                  'Proficiency in design tools like Adobe CS, Sketch, Figma, InVision, Balsamiq, or Ant Design.',
                  'Ability to understand complex requirements and design effective solutions.',
                  'Skilled in presenting designs to stakeholders across various platforms.',
                  'Collaborative mindset, working with BAs, developers, and testers.',
                  'Experience with remote teams.',
                  'Growth mindset—open to learning and feedback.'
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start space-x-2 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <FontAwesomeIcon icon={faCircle} className="w-2 h-2 mt-2 text-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Company Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-500" />
                  <span>Software Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                  <span>50-200 Employees</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Job Description</h3>
              <p className="text-gray-600 leading-relaxed">
                As the sole designer, in a team of software developers, software testers and business analysts, 
                you will be working on creating and maintaining the user experience and screen design for our 
                range of web, mobile and desktop-based systems.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  'Conduct user research and evaluate feedback to tailor designs to user needs.',
                  'Sketch, design, and discuss new concepts.',
                  'Perform usability testing.',
                  'Work with design systems like Storybook.',
                  'Create and specify user journeys and flows.',
                  'Collaborate with developers from design to deployment.',
                  'Ensure consistency by following style guidelines and UX best practices.',
                  'Engage in team collaboration, knowledge sharing, and learning.',
                  'Stay updated on emerging UI technologies and trends.'
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start space-x-2 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <FontAwesomeIcon icon={faCircle} className="w-2 h-2 mt-2 text-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-4">
  <div className="border-t p-6 flex justify-between items-center bg-gray-50">
    <a href="../userPages/dashboard"><button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105">
      <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
      <span>Back to Jobs</span>
    </button></a>

    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-all duration-200 hover:scale-105">
      <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
      <span>Submit Resume</span>
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default JobPostingCard;