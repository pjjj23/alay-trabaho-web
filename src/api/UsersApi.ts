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

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};
