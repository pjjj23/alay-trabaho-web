"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faEnvelope,
  faMagnifyingGlass,
  faUser,
  faLock,
  faFile,
  faMessage, faExclamationCircle, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { loginUser } from "@/api/UsersApi";
import { useRouter } from 'next/navigation';


const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); // "error" or "success"
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Login | AlayTrabaho";
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await loginUser({ email, password });

        console.log("Full API Response:", response);
        console.log("User Data:", response.user);

        // ✅ Check if user data exists
        if (response?.user) {  
            const { role } = response.user; // Get role from user object

            console.log("User Role:", role); 

            // Ensure Role is present
            if (!role) {
                showModal("User role is missing. Please contact support.", "error");
                return;
            }

            // Store user details
            localStorage.setItem("user", JSON.stringify(response.user));

            // ✅ Route based on Role
            if (role === "Applicant") {
                router.push("../userPages/dashboard");  
            } else if (role === "Recruiter") {
                router.push("../adminPages/dashboard");  
            } else {
                showModal("Invalid user role.", "error");
            }
        } else {
            showModal("Login failed, please check your credentials.", "error");
        }
    } catch (error: any) {
        console.error("Login Error:", error);
        showModal("Login failed, please check your credentials.", "error");
    } finally {
        setIsLoading(false);
    }
};



  const showModal = (message: string, type: "error" | "success") => {
    setModalMessage(message);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#e3f2fd] to-[#9cd5ff]  flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-sm fixed top-0 z-50 shadow-sm w-full">
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
      <div className="flex items-center gap-6">
        <button className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
          Login
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"></span>
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300 
                        hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 
                        active:scale-95 transform">
          <a href="../AuthPages/SignUp"> Sign Up </a>  
        </button>
      </div>
    </header>


      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-20 mt-[15px]">
        <div className="flex items-center justify-between w-full max-w-6xl">
          {/* Left Icon */}
          <div className="hidden md:block w-1/4">
          <img
                  src="/assets/img/SearchJob.png"  // Replace this with the actual image path
                  alt="User Icon"
                  className="w-600 h-600 object-contain transform hover:scale-110 transition-transform duration-300 absolute inset-x-0 top-20"
                /> 
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-500 text-sm">
                Sign in to continue your journey with us
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           placeholder-gray-400 text-gray-700"
                />
              </div>

              <div className="relative group">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="text-gray-400 absolute left-3 top-3 group-hover:text-blue-500 transition-colors duration-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none
                           focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white
                           placeholder-gray-400 text-gray-700"
                />
              </div>
 

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg relative overflow-hidden group
                         transition-all duration-300 hover:bg-blue-600 active:scale-95 disabled:opacity-70"
              >
                <span className={`absolute inset-0 w-0 bg-blue-400 transition-all duration-[750ms] ease-out group-hover:w-full ${isLoading ? 'animate-pulse' : ''}`}></span>
                <span className="relative">
                  {isLoading ? 'Logging in...' : 'Login'}
                </span>
              </button>

              <div className="text-center mt-6">
                <span className="text-gray-600 text-sm">Don't have an account? </span>
                <a href="../AuthPages/SignUp" className="text-blue-500 text-sm hover:text-blue-700 transition-colors duration-300 font-medium">
                  Sign Up
                </a>
              </div>
            </form>
          </div>

          {/* Right Icon */}
          <div className="hidden md:block w-1/4"> 
                <img
                  src="/assets/img/ResumeUserLogo.png"  // Replace this with the actual image path
                  alt="User Icon"
                  className="w-600 h-600 object-contain transform hover:scale-110 transition-transform duration-300 absolute inset-x-23 top-10" 
                />  
          </div>
        </div>
      </div>
      {/* Modal Component */}
            {isModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                  <FontAwesomeIcon
                    icon={modalType === "error" ? faExclamationCircle : faCheckCircle}
                    className={`text-4xl ${modalType === "error" ? "text-red-500" : "text-green-500"} mb-4`}
                  />
                  <p className="text-gray-800 mb-4">{modalMessage}</p>
                  <button onClick={closeModal} className="btn-submit">
                    OK
                  </button>
                </div>
              </div>
            )}
    </div>
  );
};

export default LoginPage;