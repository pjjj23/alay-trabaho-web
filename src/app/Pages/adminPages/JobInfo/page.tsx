"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as router } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEllipsisV,
    faMapMarkerAlt,
    faPlus,
    faHome,
    faUser,
    faLocationDot,
    faRightFromBracket,
    faTimes, faCheck, faX, faTrash, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const JobPosting = () => {
  const [activeTab, setActiveTab] = useState('details');
    const [showDropdown, setShowDropdown] = useState(false);
      const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [jobDetails, setJobDetails] = useState(null); // State to store job details
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null); // State to track errors

      const applicants = [
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
        { name: "Vivamus Sed Purus", profession: "Senior Software Developer", dateSubmitted: "February 13, 2025" },
      ];
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

    // useEffect to fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const storedUserData = localStorage.getItem('user');
                if (storedUserData) {
                    const userData = JSON.parse(storedUserData);
                    //ADD THIS CHECK
                    if(userData && userData.email){
                      const userEmail = userData.email;

                      const apiUrl = `https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters/${userEmail}`;
                      const response = await fetch(apiUrl);
                      if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      const data = await response.json();
                      console.log(data) //CHECK DATA STRUCTURE
                      setJobDetails(data); //Set the jobDetails
                    } else {
                      setError('User data does not contain email');
                    }

                } else {
                    setError('User data not found in local storage');
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {showLogoutModal && <LogoutModal />}
      {/* Header Section */}
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
        <div className="relative inset-y-50 p-10 top-10">
        {loading && <div>Loading job details...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && jobDetails && (
      <div className="bg-blue-100 rounded-lg p-6">
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="bg-green-400 w-6 h-6 rounded"></div>
              <span>{jobDetails.companyName || 'Lorem Ipsum Corporation'}</span>
            </div>
            <div className="text-right">
              <div className="font-bold">₱{jobDetails.companySalaryRange || ''}.00/monthly</div>
              <div className="text-sm">
                {jobDetails.companyAddress || 'Sto. Niño, Cebu City, Cebu, Philippines'}
                <br /> 
              </div>
              <div className="text-sm mt-1 flex justify-end items-center">
                Locate Us <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" style={{ color: "red" }}/>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">{jobDetails.hiringPosition || 'Senior UI/UX Designer'}</h1>
        <div className="flex gap-2">
          <button className="px-4 py-1 bg-blue-200 rounded-full text-sm">{jobDetails.workSchedule}</button>
          <button className="px-4 py-1 bg-blue-200 rounded-full text-sm">{jobDetails.workSetup}</button>
          <button className="px-4 py-1 bg-blue-200 rounded-full text-sm">{jobDetails.experienceLvl}</button>
        </div>
      </div>
            )}
       {/* Navigation */}
      <div className="flex justify-center mt-4 border-b">
        <button
          className={`px-6 py-2 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`px-6 py-2 ${activeTab === 'applicants' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('applicants')}
        >
          Applicants
        </button>
      </div>
       {/* Main Content */}
            {activeTab === 'details' && (
                <div className="mt-6 shadow-md bg-black/5 dark:bg-black/50 p-5">
                    <div className="flex gap-8">
                        {/* Left Column */}
                        <div className="w-7/12">
                            <section className="mb-6">
                                <h2 className="font-bold mb-2">Owner Profile:</h2>
                                {jobDetails && (  //Conditionally render only if jobDetails exists
                                  <ul className="space-y-2">
                                      <li>Name: {jobDetails.firstName} {jobDetails.middleName} {jobDetails.lastName}</li>
                                      <li>Contact#: {jobDetails.contactNumber}</li>
                                      <li>Birthday: {jobDetails.birthdate}</li>
                                      <li>Owner's Address: {jobDetails.userAddress}</li> 
                                  </ul>
                                )}
                            </section>

                            <section className="mb-6">
                                <h2 className="font-bold mb-2">Job Description:</h2>
                                {jobDetails && ( //Conditionally render only if jobDetails exists
                                  <p className="text-sm leading-relaxed">
                                      {jobDetails.companyDescription}
                                  </p>
                                )}
                            </section> 
                        </div>

                        {/* Right Column */}
                        <div className="w-5/12">
                            <div className="mb-6">
                                <h2 className="font-bold mb-4">Company Profile:</h2>
                                <table className="w-full text-sm">
                                    <tbody>
                                        <tr>
                                            <td className="pb-2">Company Name:</td>
                                            <td className="pb-2"> {jobDetails && ( //Conditionally render only if jobDetails exists
                                                <p className="text-sm leading-relaxed">
                                                    {jobDetails.companyName}
                                                </p>
                                              )}</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-2">Company Address:</td>
                                            <td className="pb-2">{jobDetails && ( //Conditionally render only if jobDetails exists
                                  <p className="text-sm leading-relaxed">
                                      {jobDetails.companyAddress}
                                  </p>
                                )}</td>
                                        </tr> 
                                    </tbody>
                                </table><br></br>
                                <h2 className="font-bold mb-4">Reach Us:</h2>
                                <div>
                                  <span className="font-semibold"><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" /></span> {jobDetails && ( //Conditionally render only if jobDetails exists
                                  <p className="text-sm leading-relaxed">
                                      {jobDetails.email}
                                  </p>
                                )}
                                </div>
                                 <div>
                                  <span className="font-semibold"><FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-500" /></span> {jobDetails && ( //Conditionally render only if jobDetails exists
                                  <p className="text-sm leading-relaxed">
                                      {jobDetails.companyContactNumber}
                                  </p>
                                )}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
      </div>

      {activeTab === 'applicants' && (
                <div className="mt-6 shadow-md bg-black/5 dark:bg-black/50 p-5 w-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-normal text-gray-600">Name</th>
                        <th className="text-left py-2 font-normal text-gray-600">Profession</th>
                        <th className="text-left py-2 font-normal text-gray-600">Date Submitted</th>
                        <th className="text-left py-2 font-normal text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map((applicant, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 1
                              ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
                              : 'hover:bg-gray-100 cursor-pointer'
                          }
                          onClick={(event) => {
                            if (event.target.tagName !== 'BUTTON' && !event.target.closest('button')) {
                              window.location.href = '../adminPages/EmployeeProfile';
                            }
                          }}
                        >
                          <td className="py-2">{applicant.name}</td>
                          <td className="py-2">{applicant.profession}</td>
                          <td className="py-2">{applicant.dateSubmitted}</td>
                          <td className="py-2">
                            <div className="flex gap-1">
                              <button className="w-5 h-5 rounded-full bg-green-500">
                                <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-white" />
                              </button>
                              <button className="w-5 h-5 rounded-full bg-red-500">
                                <FontAwesomeIcon icon={faX} className="w-4 h-4 text-white" />
                              </button>
                              <button className="w-5 h-5 rounded-full bg-gray-500">
                                <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}


      {/* Footer Dots */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default JobPosting;
