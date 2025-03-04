export const createUser = async (userData: {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: string;
  role: string;
}) => {
  try {
    const response = await fetch("https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error: ${response.statusText}`);
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Propagate the error for the calling function to handle
  }
};

export const loginUser = async (loginData: { email: string; password: string }) => {
  try {
    const response = await fetch(
      "https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/Auth/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    const responseText = await response.text(); // Get raw response text
    console.log("Raw API Response:", responseText);

    const data = JSON.parse(responseText);
    console.log("Parsed API Response:", data);

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    if (data.success && data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      return data; // ✅ Return the full response instead of just `data.user`
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};


// UsersApi.ts
export const updateRecruiter = async (jobData: { JobPostedDate: any; CompanyName: any; CompanyLogo: any; CompanyDescription: any; CompanyAddress: any; CompanyContactNumber: any; CompanySalaryRange: any; HiringPosition: any; WorkSchedule: any; WorkSetup: any; ExperienceLvl: any; userEmail: any; firstName: any; lastName: any; contactNumber: any; role: any; }) => {
  try {
    const fixedJobData = {
      email: jobData.userEmail,
      firstName: jobData.firstName,
      lastName: jobData.lastName,
      contactNumber: jobData.contactNumber,
      role: jobData.role,
      CompanyName: jobData.CompanyName,
      CompanyLogo: jobData.CompanyLogo,
      CompanyDescription: jobData.CompanyDescription,
      CompanyAddress: jobData.CompanyAddress,
      CompanyContactNumber: jobData.CompanyContactNumber,
      CompanySalaryRange: jobData.CompanySalaryRange,
      JobPostedDate: jobData.JobPostedDate,
      HiringPosition: jobData.HiringPosition,
      WorkSchedule: jobData.WorkSchedule,
      WorkSetup: jobData.WorkSetup,
      ExperienceLvl: jobData.ExperienceLvl,
    };

    const response = await fetch(
      `https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters/${jobData.userEmail}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fixedJobData),
      }
    );

    if (response.status === 204) {
      // No content to parse
      console.log("Update successful, no content returned.");
      return; // Or return a success message
    }

    const responseData = await response.json();
    console.log("Full API Response:", responseData);

    if (!response.ok) {
      console.error("Update Errors:", responseData);
      throw new Error(responseData.title || `Error: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error("Job Update API Error:", error);
    throw error;
  }
};
