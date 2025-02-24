"use client";
import { useState, useEffect } from "react";
import { updateRecruiter } from "@/api/UsersApi";

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
  const [companyNameExists, setCompanyNameExists] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const hiringPositions = ["Software Engineer", "Data Analyst", "Project Manager", "Marketing Specialist"];
  const workSchedules = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const workSetups = ["On-Site", "Remote", "Hybrid"];
  const experienceLevels = ["Entry-Level", "Mid-Level", "Senior-Level"];

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
        <input
          type="text"
          name="CompanyLogo"
          value={formData.CompanyLogo}
          onChange={handleChange}
          placeholder="Company Logo URL"
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default JobUpdateForm;
