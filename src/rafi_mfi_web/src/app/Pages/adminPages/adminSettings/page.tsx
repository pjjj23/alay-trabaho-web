"use client";
import React, { useState, useRef, useEffect } from 'react';
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

const ProfileCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/img/default-profileimg.png");
  const fileInputRef = useRef(null);
  const [firstName, setFirstName] = useState<string | null>("");
  const [middleName, setMiddleName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [birthdate, setBirthday] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");
  const [contactNumber, setContactNumber] = useState<string | null>("");
  const [companyName, setCompanyName] = useState<string | null>("");
  const [userAddress, setUserAddress] = useState<string | null>("");
  const [profileDescription, setProfileDescription] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    useEffect(() => {
      document.title = "Admin Profile | AlayTrabaho";
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          const userData = JSON.parse(storedUser);
          setFirstName(userData.firstName || "");
          setMiddleName(userData.middleName || "");
          setLastName(userData.lastName || "");
          setEmail(userData.email || "");
          setBirthday(userData.birthdate || "No birthday saved");
          setRole(userData.role || "Guest");
          setContactNumber(userData.contactNumber || "NoContactNumber");
          setCompanyName(userData.companyName || "No companyName saved");
          setUserAddress(userData.userAddress || "No address saved");
          setProfileDescription(userData.profileDescription || "Enter a short description about you here");


            // Initialize formData and tempData with the retrieved user data
            setFormData({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              middleName: userData.middleName || "",
              companyName: userData.companyName || "No companyName saved",
              birthdate: userData.birthdate || "No birthday saved",
              role: userData.role || "Guest",
              contactNumber: userData.contactNumber || "NoContactNumber",
              userAddress: userData.userAddress || "No address saved",
              profileDescription: userData.profileDescription || "Enter a short description about you here",
              email: userData.email || "",
            });

            setTempData({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              middleName: userData.middleName || "",
              companyName: userData.companyName || "No companyName saved",
              birthdate: userData.birthdate || "No birthday saved",
              role: userData.role || "Guest",
              contactNumber: userData.contactNumber || "NoContactNumber",
              userAddress: userData.userAddress || "No address saved",
              profileDescription: userData.profileDescription || "Enter a short description about you here",
              email: userData.email || "",
            });
        }
    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            name: `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim(),
            role: role || "Guest",
            contactNum: contactNumber || "NoContactNumber",
            birthdate: birthdate || "No birthday saved",
        }));
        setTempData((prevData) => ({
            ...prevData,
            name: `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim(),
            role: role || "Guest",
            contactNum: contactNumber || "NoContactNumber",
            birthdate: birthdate || "No birthday saved",
        }));

    }, [firstName, middleName, lastName, birthdate, contactNumber, role]);

    const [formData, setFormData] = useState({
        name: `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim(),
        companyName: "No companyName saved",
        birthdate: "No birthday saved",
        role: `${role || "Guest"}`,
        contactNum: contactNumber || "NoContactNumber",
        userAddress: "No address saved",
        profileDescription: `Enter a short description about you here`,
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
    });


    const [tempData, setTempData] = useState({ ...formData });

    const handleEdit = () => {
        setIsEditing(true);
        setTempData({ ...formData });
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage("");

        const storedUserData = localStorage.getItem("user");
        if (!storedUserData) {
            setMessage("User data not found. Please log in again.");
            setLoading(false);
            return;
        }

        const user = JSON.parse(storedUserData);
        const userEmail = user?.email;

        if (!userEmail) {
            setMessage("User email not found. Please log in again.");
            setLoading(false);
            return;
        }

        console.log("Updating email:", userEmail);
        console.log("FormData being sent:", formData);

        const updateData = {
            firstName: tempData.firstName,
            lastName: tempData.lastName,
            middleName: tempData.middleName,
            companyName: tempData.companyName,
            birthdate: tempData.birthdate,
            role: tempData.role,
            contactNumber: tempData.contactNumber,
            userAddress: tempData.userAddress,
            profileDescription: tempData.profileDescription,
        };

        try {
            const response = await fetch(
                `https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters/${userEmail}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateData),
                }
            );

            console.log("Response Status:", response.status);

            if (!response.ok) {
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch {
                    throw new Error("Unknown API error");
                }
                console.error("API Error Response:", errorData);
                throw new Error(errorData.message || "Failed to update profile");
            }

            setMessage("Profile updated successfully!");

            // ✅ Fetch updated profile data
            const updatedResponse = await fetch(
                `https://alaytrabaho-d6g3b8h0gabdgwgb.canadacentral-01.azurewebsites.net/api/recruiters/${userEmail}`
            );

            if (!updatedResponse.ok) {
                throw new Error("Failed to fetch updated profile");
            }

            const updatedUser = await updatedResponse.json();
            console.log("Fetched Updated User Data:", updatedUser);

            // ✅ Store the new data in localStorage
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // ✅ Update the state to reflect changes immediately
            setFirstName(updatedUser.firstName || "");
            setMiddleName(updatedUser.middleName || "");
            setLastName(updatedUser.lastName || "");
            setEmail(updatedUser.email || "");
            setBirthday(updatedUser.birthdate || "No birthday saved");
            setRole(updatedUser.role || "Guest");
            setContactNumber(updatedUser.contactNumber || "NoContactNumber");
            setCompanyName(updatedUser.companyName || "No companyName saved");
            setUserAddress(updatedUser.userAddress || "No address saved");
            setProfileDescription(updatedUser.profileDescription || "Enter a short description about you here");
            setFormData({
                name: `${updatedUser.firstName || ""} ${updatedUser.middleName || ""} ${updatedUser.lastName || ""}`.trim(),
                companyName: updatedUser.companyName || "No companyName saved",
                birthdate: updatedUser.birthdate || "No birthday saved",
                role: updatedUser.role || "Guest",
                contactNumber: updatedUser.contactNumber || "NoContactNumber",
                userAddress: updatedUser.userAddress || "No address saved",
                profileDescription: updatedUser.profileDescription || "Enter a short description about you here",
                firstName: updatedUser.firstName || "",
                lastName: updatedUser.lastName || "",
                middleName: updatedUser.middleName || "",
                email: updatedUser.email || "",
            });
            setTempData({ ...formData });

            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Update Error:", error.message);
            setMessage(`Error updating profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setTempData({ ...formData });
        setIsEditing(false);
    };

    const handleImageChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
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

    const ProfileField = ({ label, value, field, editable = true }) => {
        const handleChange = (e) => {
            setTempData({ ...tempData, [field]: e.target.value });
            if (field === "firstName") setFirstName(e.target.value);
            if (field === "middleName") setMiddleName(e.target.value);
            if (field === "lastName") setLastName(e.target.value);
            if (field === "birthday") setBirthday(e.target.value);
            if (field === "role") setRole(e.target.value);
            if (field === "contactNumber") setContactNumber(e.target.value);
            if (field === "companyName") setCompanyName(e.target.value);
            if (field === "userAddress") setUserAddress(e.target.value);
            if (field === "profileDescription") setProfileDescription(e.target.value);
        };

        return (
            <div className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-600 text-sm">{label}:</div>
                {isEditing && editable ? (
                    field === "profileDescription" ? (
                        <textarea
                            value={tempData[field] || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 text-sm"
                            rows={8}
                        />
                    ) : field === "name" ? (
                        <div className="grid grid-cols-3 gap-2">
                            <input
                                type="text" required
                                value={firstName || ""}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
                            />
                            <input
                                type="text"
                                value={middleName || ""}
                                onChange={(e) => setMiddleName(e.target.value)}
                                placeholder="Middle Name"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
                            />
                            <input
                                type="text" required
                                value={lastName || ""}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
                            />
                        </div>
                    ) : field === "birthday" ? (
                        <input
                            type="date"
                            value={tempData[field] || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
                        />
                    ) : (
                        <input
                            type="text"
                            value={tempData[field] || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
                        />
                    )
                ) : (
                    <div className={`${field === "profileDescription" ? "text-gray-700 text-sm leading-relaxed" : ""}`}>
                        {value}
                    </div>
                )}
            </div>
        );
    };



    return (
        <div className="min-h-screen bg-gradient-to-bl from-[#e3f2fd] to-[#9cd5ff]">
            {showLogoutModal && <LogoutModal />}

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
                            src={profileImage}
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

            {/* Main Content */}
            <div className="pt-40 p-10">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Profile</h2>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faPencil} />
                                <span>Edit Profile</span>
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                    <span>Save</span>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile Image */}
                        <div className="relative w-32 h-32">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-fit"
                                />
                            </div>
                            {isEditing && (
                                <>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                                    >
                                        <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileField
                                        label="First Name"
                                        value={formData.firstName}
                                        field="firstName"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Middle Name"
                                        value={formData.middleName}
                                        field="middleName"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Last Name"
                                        value={formData.lastName}
                                        field="lastName"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Company Name"
                                        value={formData.companyName}
                                        field="companyName"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Birthday"
                                        value={formData.birthdate}
                                        field="birthday"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Role"
                                        value={formData.role}
                                        field="role"
                                        editable={false}
                                    />
                                    <ProfileField
                                        label="Contact Number"
                                        value={formData.contactNumber}
                                        field="contactNum"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Address"
                                        value={formData.userAddress}
                                        field="userAddress"
                                        editable={isEditing}
                                    />
                                    <ProfileField
                                        label="Bio"
                                        value={formData.profileDescription}
                                        field="profileDescription"
                                        editable={isEditing}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
