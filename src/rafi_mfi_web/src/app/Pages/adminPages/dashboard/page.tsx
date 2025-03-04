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
  faTimes, faPencil
} from '@fortawesome/free-solid-svg-icons';

// JobCard Component
const JobCard = ({ colorScheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [jobPostedDate, setjobPostedDate] = useState(null); 
  const [companyName, setcompanyName] = useState(null); 
  const [hiringPosition, sethiringPosition] = useState(null); 
  const [workSchedule, setworkSchedule] = useState(null); 
  const [workSetup, setworkSetup] = useState(null); 
  const [experienceLvl, setexperienceLvl] = useState(null); 
  const [companySalaryRange, setcompanySalaryRange] = useState(null); 
  const [companyAddress, setcompanyLocation] = useState(null); 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      } 
    };
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser); 
      setjobPostedDate(userData.jobPostedDate || "NULL");
      setcompanyName(userData.companyName || "NULL");
      sethiringPosition(userData.hiringPosition || "NULL");
      setworkSchedule(userData.workSchedule || "NULL");
      setworkSetup(userData.workSetup || "NULL");
      setexperienceLvl(userData.experienceLvl || "NULL"); 
      setcompanySalaryRange(userData.companySalaryRange || "NULL");
      setcompanyLocation(userData.companyAddress || "NULL");
    }
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  const [recruiterData, setRecruiterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecruiterData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Get the email from localStorage
        const storedUser = localStorage.getItem("user");
        let userEmail = null;

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            userEmail = userData.email; // Assuming the email is stored under the 'email' key
          } catch (parseError) {
            console.error("Error parsing user data from localStorage:", parseError);
            setError("Error parsing user data.");
            setLoading(false);
            return;
          }
        }

        if (!userEmail) {
          setError("No email found in localStorage.");
          setLoading(false);
          return;
        }

        // 2. Fetch recruiters from the API
        const response = await fetch("https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recruiters = await response.json();

        // 3. Find the recruiter matching the email
        const matchedRecruiter = recruiters.find(
          (recruiter) => recruiter.email === userEmail
        );

        if (matchedRecruiter) {
          // 4. Set the state with the found recruiter data
          setRecruiterData(matchedRecruiter);
        } else {
          setError("Recruiter not found for the given email.");
        }
      } catch (err) {
        console.error("Error fetching recruiter data:", err);
        setError("Failed to fetch recruiter data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (loading) {
    return <p>Loading recruiter data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!recruiterData) {
    return <p>No recruiter data to display.</p>;
  }

  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();

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
    const { email: userEmail } = userData;

    if (!userEmail) {
        alert("Error: User email is missing.");
        return;
    }

    // Show confirmation alert
    const confirmRemove = window.confirm("Are you sure you want to empty all the fields?");
    if (!confirmRemove) {
        return; // If the user cancels, exit the function
    }

    // Prepare the data to be sent to the API (empty values)
    const jobData = {
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
    };

    console.log("Job Data being sent for update:", JSON.stringify(jobData, null, 2));

    try {
        // Make the API call to update the recruiter by email
        const response = await fetch(`https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters/${userEmail}`, {
            method: 'PUT', // Or PATCH, depending on your API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        });

        if (!response.ok) {
            throw new Error(`Failed to update recruiter: ${response.status}`);
        }

        console.log("API Response:", response);
        alert("Job successfully updated to empty values!");

    } catch (error: any) {
        console.error("Job Update API Error:", error);
        if (error.response) {
            console.error("Error Details:", error.response.data);
        }
        alert(`Failed to update job to empty values: ${error.message}`);
    }
};



  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
      <div className={`w-full h-full rounded-xl p-8 ${colorScheme.bg}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="text-lg text-gray-600">Date Posted: {recruiterData.jobPostedDate}</span> 
            <span className="text-xl text-gray-600 mt-2 uppercase ">{recruiterData.companyName}</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-600 hover:text-gray-800 p-2"
            >
              <FontAwesomeIcon icon={faEllipsisV} className="w-5 h-5" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <a href="../adminPages/addJob"><button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      console.log('Edit clicked');
                      setIsDropdownOpen(false);
                    }}
                  > 
                    Edit
                  </button></a>
                  <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={handleRemove} // Call handleRemove directly
                  >
                      Remove
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          {recruiterData.hiringPosition}
        </h3>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-3">Job Type</h4>
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-2 rounded-full text-base ${colorScheme.tagBg} ${colorScheme.tagText}`}>
                {recruiterData.workSchedule}
              </span>
              <span className={`px-4 py-2 rounded-full text-base ${colorScheme.tagBg} ${colorScheme.tagText}`}>
                {recruiterData.workSetup}
              </span>
              <span className={`px-4 py-2 rounded-full text-base ${colorScheme.tagBg} ${colorScheme.tagText}`}>
                {recruiterData.experienceLvl}
              </span>
            </div>
          </div> 
          <div>
            <h4 className="text-lg font-semibold mb-3">Location</h4>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-2 text-red-500" />
              <span className="text-base">{recruiterData.companyAddress}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-gray-800">₱{recruiterData.companySalaryRange}.00/monthly</span>
            <span className="text-base text-gray-600">Expected Salary</span>
          </div>

          <a href="../adminPages/JobInfo">
            <button className="px-10 py-3 rounded-full text-base font-medium bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300">
              View Details
            </button>
          </a>
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
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
          onClick={() => {
            localStorage.clear();
            window.location.href = "../AuthPages/LogIn";
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 mr-2" />
          <span>Logout</span>
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
  const [firstName, setFirstName] = useState(null);
  const [jobPostedDate, setjobPostedDate] = useState(null);


  const [hasCompanyName, setHasCompanyName] = useState(false);
  
    useEffect(() => {
      // Put the local storage logic here as well
      const storedUser = localStorage.getItem("user");
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Check if userData exists and contains CompanyName with a non-empty value
          if (userData && userData.companyName) {
            setHasCompanyName(true);
          } else {
            setHasCompanyName(false);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          setHasCompanyName(false); // default to false in case of an error
        }
      } else {
        setHasCompanyName(false); // default to false if no user data
      }

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setFirstName(userData.firstName || "User");
        setjobPostedDate(userData.jobPostedDate || "User");}
    }, []); // Empty dependency array to run only on mount
 
    
  const colorScheme = {
    bg: 'bg-blue-50',
    tagBg: 'bg-gradient-to-br from-blue-200 to-black-50',
    tagText: 'text-black'
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#e3f2fd] to-[#9cd5ff]">
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

              <a href="../adminPages/savedLocation">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-white" />
                  <span className="text-white">Save Location</span>
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 pt-24 pb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Current Job Posted</h2>
        
        <JobCard colorScheme={colorScheme} />
      </main>

      {/* Fixed Add Button */}
      <button
      onClick={() => {
        window.location.href = "../adminPages/addJob";
      }}
      className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 rounded-full shadow-lg 
          flex items-center justify-center text-white hover:bg-blue-700"
    >
      <FontAwesomeIcon icon={hasCompanyName ? faPencil : faPlus} className="w-6 h-6" />
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