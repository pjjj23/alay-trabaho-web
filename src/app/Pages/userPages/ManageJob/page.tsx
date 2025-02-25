"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as router } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faRightFromBracket, faHome, faUser, faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const JobApplicationsDashboard = () => {
    useEffect(() => {
        document.title = "Manage Applied Jobs | AlayTrabaho";
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setFirstName(userData.firstName || "User"); // Default to "User" if firstName is missing
        }
    }, []);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [applications, setApplications] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            setError(null);

            try {
                // Use the hardcoded email for filtering
                const userEmail = "pjjbonbon@gmail.com";

                console.log("User Email from Local Storage:", userEmail);

                const response = await fetch(`https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/applyJobs`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                console.log("Data from API:", data);

                // Ensure data is an array before filtering
                if (!Array.isArray(data)) {
                    throw new Error("Data from API is not an array.");
                }

                const filteredApplications = data.filter(app => app.email === userEmail);

                console.log("Filtered Applications:", filteredApplications);

                setApplications(filteredApplications);
            } catch (err) {
                setError(err.message || "An error occurred while fetching data.");
                console.error("Error fetching applications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

     // **IMPORTANT:** This function now only displays an alert.
     const handlePlaceholderDelete = (companyName) => {
        alert(`Delete button clicked for ${companyName}.  No actual delete operation is performed.`);
        // You can add other UI feedback here, like changing the button style, etc.
    };

    const getStatusColor = (status) => {
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
        <div className="min-h-screen bg-gradient-to-bl from-[#e3f2fd] to-[#9cd5ff] mt-0">
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
                        </header>
            

            <div className="mt-0 max-w-5xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-20">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
                            <div className="text-sm text-gray-500">
                                Total Applications: {applications.length}
                            </div>
                        </div>
                    </div>

                    {/* Conditional rendering for loading, error, and data */}
                    {loading && <div className="p-6 text-center">Loading applications...</div>}
                    {error && <div className="p-6 text-center text-red-500">Error: {error}</div>}

                    {!loading && !error && (
                        <div className="divide-y divide-gray-200">
                            {/* Header Row */}
                            <div className="grid grid-cols-3 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
                                <div>Company Name</div>
                                <div>Status</div>
                                <div>Actions</div>
                            </div>

                            {/* Application Rows */}
                            {applications.length === 0 ? (
                                <div className="p-6 text-center">No applications found for this user.</div>
                            ) : (
                                applications.map((app) => (
                                    <div
                                        key={`${app.email}-${app.companyName}`} // create unique key to prevent re-rendering issues
                                        className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FontAwesomeIcon
                                                icon={faBuilding}
                                                className="text-gray-400 w-4 h-4 group-hover:text-blue-500 transition-colors"
                                            />
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {app.companyName}
                                            </span>
                                        </div>

                                        <div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.applicantApplyStatus)} transition-all duration-200 group-hover:scale-105`}>
                                                {app.applicantApplyStatus}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handlePlaceholderDelete(app.companyName)} // **Call the placeholder function**
                                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationsDashboard;
