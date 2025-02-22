"use client";
import { useState, useEffect } from "react";
import { addRecruiter } from "@/api/UsersApi"; // Adjust path as needed

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

  const hiringPositions = ["Software Engineer", "Data Analyst", "Project Manager", "Marketing Specialist"];
  const workSchedules = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const workSetups = ["On-Site", "Remote", "Hybrid"];
  const experienceLevels = ["Entry-Level", "Mid-Level", "Senior-Level"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setRecruiterData({
          ...recruiterData, // Keep existing role
          firstName: userData.firstName || "", 
          lastName: userData.lastName || "",
          contactNumber: userData.contactNumber || "", 
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Error: No logged-in user found.");
      return;
    }
  
    const userData = JSON.parse(storedUser);
    const { email: userEmail, firstName, lastName, contactNumber, role } = userData;
  
    if (!userEmail) {
      alert("Error: User email is missing.");
      return;
    }
  
    const jobData = {
      userEmail,
      firstName: recruiterData.firstName,  // ✅ Use recruiterData
      lastName: recruiterData.lastName,    // ✅ Use recruiterData
      contactNumber: recruiterData.contactNumber,  // ✅ Use recruiterData
      role,
      ...formData,
      JobPostedDate: new Date(formData.JobPostedDate).toISOString(),
    };
    
  
    console.log("Job Data being sent:", JSON.stringify(jobData, null, 2)); // Debugging
  
    try {
      const response = await addRecruiter(jobData);
      console.log("API Response:", response);
      alert("Job successfully added!");
    } catch (error: any) {
      console.error("Job Adding API Error:", error);
      if (error.response) {
        console.error("Error Details:", error.response.data);
      }
      alert(`Failed to add job: ${error.message}`);
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Job Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="CompanyName" value={formData.CompanyName} onChange={handleChange} placeholder="Company Name" required className="w-full p-2 border rounded" />
        <input type="text" name="CompanyLogo" value={formData.CompanyLogo} onChange={handleChange} placeholder="Company Logo URL" required className="w-full p-2 border rounded" />
        <textarea name="CompanyDescription" value={formData.CompanyDescription} onChange={handleChange} placeholder="Company Description" required className="w-full p-2 border rounded"></textarea>
        <input type="text" name="CompanyAddress" value={formData.CompanyAddress} onChange={handleChange} placeholder="Company Address" required className="w-full p-2 border rounded" />
        <input type="text" name="CompanyContactNumber" value={formData.CompanyContactNumber} onChange={handleChange} placeholder="Company Contact Number" required className="w-full p-2 border rounded" />
        <input type="text" name="CompanySalaryRange" value={formData.CompanySalaryRange} onChange={handleChange} placeholder="Salary Range" required className="w-full p-2 border rounded" />
        <input type="date" name="JobPostedDate" value={formData.JobPostedDate} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="HiringPosition" value={formData.HiringPosition} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Hiring Position</option>
          {hiringPositions.map((position) => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
        <select name="WorkSchedule" value={formData.WorkSchedule} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Work Schedule</option>
          {workSchedules.map((schedule) => (
            <option key={schedule} value={schedule}>{schedule}</option>
          ))}
        </select>
        <select name="WorkSetup" value={formData.WorkSetup} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Work Setup</option>
          {workSetups.map((setup) => (
            <option key={setup} value={setup}>{setup}</option>
          ))}
        </select>
        <select name="ExperienceLvl" value={formData.ExperienceLvl} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Experience Level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Post Job</button>
      </form>
    </div>
  );
};

export default JobUpdateForm;
