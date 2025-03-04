"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, 
  faSave,
  faTrash, faHome, faUser, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

const SimpleLocationSaver = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [locationName, setLocationName] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD2z-IxhB9cO0mLaNHwBAnRe0pOT0DQl4Y`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }

    // Load saved locations from localStorage
    const storedLocations = localStorage.getItem('savedLocations');
    if (storedLocations) {
      setSavedLocations(JSON.parse(storedLocations));
    }
  }, []);

  // Initialize map when API is loaded
  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstanceRef.current) {
      const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Default coordinates
      
      const mapOptions = {
        center: defaultLocation,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      };
      
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Create a marker that can be dragged
      markerRef.current = new window.google.maps.Marker({
        position: defaultLocation,
        map: mapInstanceRef.current,
        draggable: true,
        title: 'Drag to set location'
      });
      
      // Update coordinates when marker is dragged
      window.google.maps.event.addListener(markerRef.current, 'dragend', () => {
        const position = markerRef.current.getPosition();
        setCurrentLocation({
          lat: position.lat(),
          lng: position.lng()
        });
      });

      // Set initial coordinates
      setCurrentLocation(defaultLocation);
    }
  }, [mapLoaded]);

  // Save locations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Update map and marker
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setCenter(currentPos);
          markerRef.current.setPosition(currentPos);
        }
        
        // Update current location state
        setCurrentLocation(currentPos);
      }, () => {
        alert('Error getting your location');
      });
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  const saveLocation = () => {
    if (!locationName.trim()) {
      alert('Please enter a location name');
      return;
    }

    const newLocation = {
      id: Date.now(),
      name: locationName,
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      timestamp: new Date().toISOString()
    };

    setSavedLocations(prev => [...prev, newLocation]);
    setLocationName('');
  };

  const deleteLocation = (id) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== id));
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
   const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    const [firstName, setFirstName] = useState<string | null>(null); 
    useEffect(() => {
        document.title = "Save Location | AlayTrabaho";
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setFirstName(userData.firstName || "User"); // Default to "User" if firstName is missing
        }
      }, []);
  return (
    <div className="min-h-screen bg-blue-50">
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
                            <a href="../adminPages/dashboard"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                              <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-white" />
                               <span className="text-white">Home</span> 
                            </button></a>
              
                            <a href="../adminPages/adminSettings"><button className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2">
                              <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                               <span className="text-white">Profile</span> 
                            </button></a> 
                            
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

      <h1 className="text-xl font-bold mb-40">Location Saver</h1>
      
      {/* Map */}
      <div 
        ref={mapRef}
        className="w-full h-48 mb-4 rounded-md border"
      >
        {!mapLoaded && <div className="flex items-center justify-center h-full">Loading map...</div>}
      </div>
      
      {/* Current Coordinates */}
      <div className="mb-4 p-3 bg-gray-100 rounded-md">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold">Current Coordinates:</h2>
            <p className="mt-1">Latitude: {currentLocation.lat?.toFixed(6)}</p>
            <p>Longitude: {currentLocation.lng?.toFixed(6)}</p>
          </div>
          <button 
            onClick={getCurrentLocation}
            className="bg-blue-500 text-white h-10 px-3 rounded-md self-center"
          >
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            Get My Location
          </button>
        </div>
      </div>
      
      {/* Save Form */}
      <div className="mb-6 flex"> 
        <button 
          onClick={saveLocation}
          className="bg-green-500 text-white px-10 rounded-full"
          disabled={!currentLocation.lat || !locationName}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save
        </button>
      </div>
       
    </div>
  );
};

export default SimpleLocationSaver;