"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faEnvelope,
    faMapMarkerAlt,
    faDollarSign,
    faUsers,
    faChevronLeft,
    faPaperPlane,
    faCircle,
    faLocationDot,
    faRightFromBracket,
    faHome,
    faUser, faPhoneAlt,
    faBackward
} from '@fortawesome/free-solid-svg-icons';

const ApplyJob = () => {
    const searchParams = useSearchParams();
    const recruiterData = searchParams.get('recruiter');
    const recruiter = recruiterData ? JSON.parse(recruiterData) : null;
    const [isVisible, setIsVisible] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [showResumeModal, setShowResumeModal] = useState(false); // New state for the resume modal
    const [resumeLink, setResumeLink] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
        document.title = "Apply | AlayTrabaho";
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setFirstName(userData.firstName || "User");
            fetchResumeLink(userData.email); // Fetch resume link when component mounts
        }
    }, []);

    if (!recruiter) {
        return <div>No recruiter data found.</div>;
    }

    
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
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                            onClick={() => {
                                localStorage.clear(); // Clear user data
                                window.location.href = "../AuthPages/LogIn"; // Redirect to login page
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        );

    const ResumeModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 transform transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4">Resume Required</h3>
                <p className="text-gray-600 mb-6">Please set up your resume link in your profile before submitting an application.</p>
                <div className="flex justify-end">
                    <a href="../userPages/UserSettings">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                            Go to Profile
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );

    const fetchResumeLink = async (userEmail: string) => {
        try {
            const response = await fetch(`https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/applicant/${userEmail}`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.resumeLink) {
                    setResumeLink(data.resumeLink);
                } else {
                    setResumeLink(null); // Set to null if resumeLink is missing
                }
            } else {
                console.error('Failed to fetch resume link:', response);
                setResumeLink(null); // Set to null on error
            }
        } catch (error) {
            console.error('Error fetching resume link:', error);
            setResumeLink(null); // Set to null on error
        }
    };


    const handleSubmitResume = async () => {
        if (!resumeLink) {
            setShowResumeModal(true); // Show the modal if resumeLink is empty
            return; // Stop the submission
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const applicationData = {
                email: userData.email,
                applicantApplyStatus: 'pending', // Default status
                companyName: recruiter.companyName,
                resumeLink: resumeLink, // Include the resume link
            };

            try {
                const response = await fetch('https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/applyJobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(applicationData),
                });

                if (response.ok) {
                    alert('Application submitted successfully!');
                    // Optionally, redirect the user or update the UI
                } else {
                    // Log the full response for debugging
                    const errorData = await response.json(); // Attempt to parse JSON
                    console.error('Failed to submit application:', errorData);
                    alert(`Failed to submit application.  ${errorData.message || 'Please try again.'}`); // Display error message
                }
            } catch (error) {
                console.error('Error submitting application:', error);
                alert('An error occurred while submitting the application. Please try again.');
            }
        } else {
            alert('No user data found. Please log in.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-bl from-[#e3f2fd] to-[#9cd5ff]">
           {showLogoutModal && <LogoutModal />}
            {showResumeModal && <ResumeModal />} {/* Render the resume modal */}
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
                                <span className="mr-10 text-gray-700 font-semibold">Hello, {firstName}!</span>
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
                        </header>... {/* Main Content */}
            <div className="container mx-auto px-20 py-20">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Job Header Section */}
                    <div className="bg-blue-100 p-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <img src="/assets/img/Logo.png" alt="Company Logo" className="w-12 h-12 rounded-lg mr-4" />
                                    <h2 className="text-xl font-semibold">{recruiter.companyName}</h2>
                                </div>
                                <h1 className="text-3xl font-bold mb-4">{recruiter.hiringPosition}</h1>
                                <div className="flex gap-3">
                                    <span className="bg-blue-200 px-4 py-1 rounded-full text-sm">{recruiter.workSchedule}</span>
                                    <span className="bg-blue-200 px-4 py-1 rounded-full text-sm">{recruiter.workSetup}</span>
                                    <span className="bg-blue-200 px-4 py-1 rounded-full text-sm">{recruiter.experienceLvl}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold mb-2">₱{recruiter.companySalaryRange}.00/monthly</div>
                                <div className="text-sm">
                                  <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-red-500" />
                                    {recruiter.companyAddress}
                                    <button className="ml-2 text-blue-600">Locate us</button>
                                </div>
                            </div>
                        </div>
                    </div>... {/* Job Details Section */}
                    <div className="p-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Job Description:</h3>
                                <div className="whitespace-pre-line">{recruiter.companyDescription}</div>
                            </div>
                            <div>
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4">Company Profile:</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-semibold">Company Name:</span> {recruiter.companyName}
                                        </div> 
                                        <div>
                                            <span className="font-semibold">Owner Name:</span> {recruiter.firstName} {recruiter.middleName} {recruiter.lastName}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Job Posted:</span> {recruiter.jobPostedDate}
                                        </div>
                                        <br></br><h3 className="text-xl font-bold mb-4">Reach Us:</h3> 
                                        <div>
                                            <span className="font-semibold"><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" /></span> {recruiter.email}
                                        </div>
                                        <div>
                                            <span className="font-semibold"><FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-blue-500" /></span> {recruiter.companyContactNumber}
                                        </div>
                                    </div>
                                </div>
 
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end mt-8 space-x-4">
                            <button 
                                onClick={() => window.history.back()}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Back
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleSubmitResume}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2 text-white-500" /> Submit Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default ApplyJob;
