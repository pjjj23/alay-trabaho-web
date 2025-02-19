"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUser, 
  faLocationDot, 
  faRightFromBracket,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

const ProfileCard = () => { 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/img/default-profileimg.png");

  useEffect(() => {
    document.title = "Admin Profile | AlayTrabaho";
  }, []);

  const formData = {
    name: 'Juan Dela Cruz',
    profession: 'Software Developer',
    birthday: 'May 05, 2000',
    role: 'Recruiter',
    contactNumber: '09154600068',
    address: 'A. Lopez St, Labangon, Cebu City, Cebu, Philippines',
    bio: `Sed dictum nunc sit amet libero sit imperdium urna semetnec. Morbi ut dia prametib, vestibulu urna dictum effici. 
    Nullam tincidunt nibh, pharetra velit auctor, nec malesuada arma portis. Suspendisse, ornare odio at maximus sodales. Proin 
    venenatis justo eu mi imperdiet, quis mattis arcu lobortis. Pellentesque orare nulla facilisis magna imperdiet dictum. Suspendisse 
    augue nisi, rhoncus eget nisi eget, sociates tincidunt dui. Pellentesque sodales, diam eget sollicitudin finibus, sapien enim finibus 
    diam, at placerat nisi purus vitae nunc. Phasellus vitae facilisis metus. Nullam vehicula est consectetur, malesuada nulla vitae, 
    molestie sapien. Pellentesque ac augue id neque mattis vestibulum nec imperdiet ligula.

    Aenean et varius nisi. In hac habitasse platea dictumst. Pellentesque volutpat massa quam, ut eleifend tellus ornare id. 
    Suspendisse tempor sagittis sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam quis sodales est, 
    ut facilisis eros. Praesent faucibus ex vitae tellus convallis, eu volutpat massa tempus. Donec commodo tortor vitae turpis ultrices, 
    sit amet tempor quam malesuada libero, vel porta purus augue viverra turpis. Sed cursus lacus et laculis rhoncus.`
  };

  const handleDownloadCV = () => {
    // Add CV download logic here
    console.log('Downloading CV...');
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

  const ProfileField = ({ label, value }) => {
    return (
      <div className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
        <div className="text-gray-600 text-sm">{label}:</div>
        <div className={`${label === 'Bio' ? 'text-gray-700 text-sm leading-relaxed' : ''}`}>
          {value}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
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
              src={profileImage}
              className="w-10 h-10 rounded-full top-4 right-8 absolute object-cover"
            />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-16 w-56 bg-gray-800 rounded-lg shadow-lg py-2 transition-all duration-300">
              <a href="../adminPages/dashboard">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                  <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-white" />
                  <span className="text-white">Home</span> 
                </button>
              </a>

              <a href="../adminPages/adminSettings">
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

      {/* Main Content */}
      <div className="pt-40 p-10">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative w-32 h-32">
              <div className="w-32 h-32 rounded-2xl overflow-hidden">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-fit"
                />
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileField label="Name" value={formData.name} />
                  <ProfileField label="Profession" value={formData.profession} />
                  <ProfileField label="Birthday" value={formData.birthday} />
                  <ProfileField label="Role" value={formData.role} />
                  <ProfileField label="Contact Number" value={formData.contactNumber} />
                  <ProfileField label="Address" value={formData.address} />
                </div>

                <div className="mt-6">
                  <ProfileField label="Bio" value={formData.bio} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Download CV Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;