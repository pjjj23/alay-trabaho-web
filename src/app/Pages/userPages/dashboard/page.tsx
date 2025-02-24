"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faRightFromBracket, faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation"; // Correct import for Next.js
import Link from 'next/link'; // Import the Link component

const JobListingsPage = () => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const router = useRouter();
    const [recruiters, setRecruiters] = useState<any[]>([]); // State to store recruiters
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        document.title = "User Dashboard | AlayTrabaho";
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setFirstName(userData.firstName || "User"); // Default to "User" if firstName is missing
        }
        if (!storedUser) {
            router.push("/Pages/AuthPages/LogIn"); // 🔥 Redirect to login page if no session
        }
    }, []);

    useEffect(() => {
        // Fetch recruiters data, similar to your original code
        const storedData = localStorage.getItem("recruiters");

        if (storedData) {
            setRecruiters(JSON.parse(storedData));
            setLoading(false);
        } else {
            fetch("https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch recruiters");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Filter recruiters where companyName is not empty or null
                    const filteredRecruiters = data.filter(recruiter => recruiter.companyName && recruiter.companyName.trim() !== "");

                    // Store filtered data in localStorage
                    localStorage.setItem("recruiters", JSON.stringify(filteredRecruiters));

                    setRecruiters(filteredRecruiters);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching recruiters:", error);
                    setLoading(false);
                });
        }
    }, []);


    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [filters, setFilters] = useState({
        workSchedule: [],
        experienceLevel: [],
        workSetup: []
    });

    const JobCard = ({ recruiter }) => {
        return (
            <div className="bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-700 text-xs">{recruiter.jobPostedDate}</p>
                        <p className="text-gray-700 mt-2 text-base">{recruiter.companyName}</p>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">{recruiter.hiringPosition}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 rounded-full text-sm text-gray-600">
                        {recruiter.workSchedule}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 rounded-full text-sm text-gray-600">
                        {recruiter.workSetup}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 rounded-full text-sm text-gray-600">
                        {recruiter.experienceLvl}
                    </span>
                </div><hr></hr>
                <span>₱{recruiter.companySalaryRange}.00</span>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600 text-sm">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-red-500" />
                        <span>{recruiter.companyAddress}</span>
                    </div>

                </div>

                <Link
                    href={{
                        pathname: '../userPages/ApplyJob',
                        query: { recruiter: JSON.stringify(recruiter) },
                    }}
                    passHref
                >
                    <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 w-full">
                        Details
                    </button>
                </Link>
            </div>
        );
    };

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
                                    {/* Define Work Schedule Options */}
                                    {[
                                        { value: 'full-time', label: 'Full Time' },
                                        { value: 'part-time', label: 'Part Time' },
                                        { value: 'internship', label: 'Internship' },
                                        { value: 'contract', label: 'Contract' }
                                    ].map((option, index) => (
                                        <label key={index} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                value={option.value} // Use the value
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-gray-800">{option.label}</span> {/* Use the label */}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Experience Level</h4>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {/* Define Experience Level Options */}
                                    {[
                                        { value: 'no-experience', label: 'No Experience' },
                                        { value: 'entry-level', label: 'Entry Level' },
                                        { value: 'associate', label: 'Associate' },
                                        { value: 'mid-senior', label: 'Mid-Senior Level' },
                                        { value: 'senior', label: 'Senior Level' }
                                    ].map((option, index) => (
                                        <label key={index} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                value={option.value} // Use the value
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-gray-800">{option.label}</span> {/* Use the label */}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Work Setup */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Work Setup</h4>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {/* Define Work Setup Options */}
                                    {[
                                        { value: 'remote', label: 'Remote' },
                                        { value: 'hybrid', label: 'Hybrid' },
                                        { value: 'on-site', label: 'On-Site' }
                                    ].map((option, index) => (
                                        <label key={index} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                value={option.value} // Use the value
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-gray-800">{option.label}</span> {/* Use the label */}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Job Listings Grid */}
                    <div className="flex-1 overflow-y-auto max-h-screen">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? <p>Loading...</p> : (
                                recruiters.map((recruiter, index) => (
                                    <JobCard key={index} recruiter={recruiter} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobListingsPage;
