"use client";
import { useState, useEffect } from "react";
import { updateRecruiter } from "@/api/UsersApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faLocationDot,
    faRightFromBracket,
    faPencil,
    faCheck,
    faTimes,
    faCamera
} from '@fortawesome/free-solid-svg-icons';

const JobUpdateForm = () => {
  const [formData, setFormData] = useState({
    CompanyName: "",
    CompanyLogo: "",
    CompanyDescription: "",
    CompanyAddress: "",
    CompanyContactNumber: "",
    CompanySalaryRange: "",
    JobPostedDate: "",
    HiringPosition: "",
    WorkSchedule: "",
    WorkSetup: "",
    ExperienceLvl: "",
  });

  const [recruiterData, setRecruiterData] = useState({
    role: "Recruiter",
    firstName: "",
    lastName: "",
    contactNumber: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState<string | null>("");
  const [companyNameExists, setCompanyNameExists] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
  const hiringPositions = ["Software Engineer", "Data Analyst", "Project Manager", "Marketing Specialist"];
  const workSchedules = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const workSetups = ["On-Site", "Remote", "Hybrid"];
  const experienceLevels = ["Entry-Level", "Mid-Level", "Senior-Level"];

  
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
  
  // Modal Component (Same as before - keep it)
  const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Cannot Add More Jobs
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                You have already added a job with a Company Name. You cannot add
                more jobs.
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (!storedUser) {
      console.warn("No user data found in localStorage.");
      setLoading(false);
      return;
    }
    
  
    try {
      const userData = JSON.parse(storedUser);
      
      if (!userData || !userData.email) {
        console.warn("User data in localStorage is invalid or missing email.");
        setLoading(false);
        return;
      }

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setFirstName(userData.firstName || "User"); }
  
      const { email } = userData;
      console.log("Fetching CompanyName for email:", email); // Added log
  
      const fetchCompanyName = async () => {
        try {
          const response = await fetch(
            `https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters/${email}`
          );
  
          console.log("API Response Status:", response.status); // Added log
  
          if (!response.ok) {
            if (response.status === 404) {
              setCompanyNameExists(false);
              console.log("Recruiter not found, setting companyNameExists to false"); // Added log
            } else {
              console.error("Failed to fetch CompanyName:", response.status, response.statusText);
            }
            setLoading(false);
            return;
          }
  
          const data = await response.json();
          console.log("API Response Data:", data); // Added log
  
          if (data && data.CompanyName) {
            setCompanyNameExists(true);
            console.log("CompanyName found:", data.CompanyName, "setting companyNameExists to true"); // Added log
          } else {
            setCompanyNameExists(false);
            console.log("CompanyName not found or empty, setting companyNameExists to false"); // Added log
          }
        } catch (error) {
          console.error("Error fetching CompanyName:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCompanyName();
      setRecruiterData({
        ...recruiterData,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        contactNumber: userData.contactNumber || "",
      });
    } catch (error) {
      console.error("Error processing user data:", error);
      setLoading(false);
    }
  }, []);
  

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (companyNameExists) {
        setShowModal(true);
        return;
      }
    
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
    alert("Error: No logged-in user found.");
    return;
    }
    
    const userData = JSON.parse(storedUser);
    if (!userData) {
    alert("Error: Could not parse user data.");
    return;
    }
    const { email: userEmail, firstName, lastName, contactNumber, role } = userData;
    
    if (!userEmail) {
    alert("Error: User email is missing.");
    return;
    }
    
    const jobData = {
    userEmail,
    firstName: recruiterData.firstName,
    lastName: recruiterData.lastName,
    contactNumber: recruiterData.contactNumber,
    role,
    ...formData,
    JobPostedDate: formData.JobPostedDate ? new Date(formData.JobPostedDate).toISOString() : null,
    };
    
    
    console.log("Job Data being sent for update:", JSON.stringify(jobData, null, 2));
    
    try {
    const response = await updateRecruiter(jobData); // Changed function call
    console.log("API Response:", response);
    alert("Job successfully updated!"); // Changed alert message
    window.location.href = "../adminPages/dashboard";
    } catch (error: any) {
    console.error("Job Update API Error:", error); // Changed error message
    if (error.response) {
    console.error("Error Details:", error.response.data);
    }
    alert(`Failed to update job: ${error.message}`); // Changed alert message
    }
    };
    
    

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#e3f2fd] to-[#9cd5ff]">
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
        
                                    <a href="../adminPages/savedLocation"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-white" />
                                        <span className="text-white">Save Location</span>
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
                    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Job Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="CompanyName"
          value={formData.CompanyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full p-2 border rounded"
        /> 
        <textarea
          name="CompanyDescription"
          value={formData.CompanyDescription}
          onChange={handleChange}
          placeholder="Company Description"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="CompanyAddress"
          value={formData.CompanyAddress}
          onChange={handleChange}
          placeholder="Company Address"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="CompanyContactNumber"
          value={formData.CompanyContactNumber}
          onChange={handleChange}
          placeholder="Company Contact Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="CompanySalaryRange"
          value={formData.CompanySalaryRange}
          onChange={handleChange}
          placeholder="Salary Range"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="JobPostedDate"
          value={formData.JobPostedDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="HiringPosition"
          value={formData.HiringPosition}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Hiring Position</option>
          {hiringPositions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        <select
          name="WorkSchedule"
          value={formData.WorkSchedule}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Work Schedule</option>
          {workSchedules.map((schedule) => (
            <option key={schedule} value={schedule}>
              {schedule}
            </option>
          ))}
        </select>
        <select
          name="WorkSetup"
          value={formData.WorkSetup}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Work Setup</option>
          {workSetups.map((setup) => (
            <option key={setup} value={setup}>
              {setup}
            </option>
          ))}
        </select>
        <select
          name="ExperienceLvl"
          value={formData.ExperienceLvl}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Experience Level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Post Job
        </button>
      </form>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default JobUpdateForm;
