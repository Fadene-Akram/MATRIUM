import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterDevice.module.css";

const RegisterDevice = () => {
  const [adminPassword, setAdminPassword] = useState(""); // Admin password input
  const [statusMessage, setStatusMessage] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Track if admin is logged in
  const [showNotification, setShowNotification] = useState(false); // For showing notification
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // Replace with your actual admin login check (e.g., fetch or static check)
    if (adminPassword === "admin123") {
      // Example password check
      setIsAdminLoggedIn(true);
      setStatusMessage(""); // Clear any status message
    } else {
      setStatusMessage("Invalid admin password.");
    }
  };

  // Generate device fingerprint
  const generateFingerprint = () => {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    const rawFingerprint = `${userAgent}|${language}|${timezone}|${screenResolution}`;
    return btoa(rawFingerprint); // Base64 encode the fingerprint
  };

  const handleGenerateFingerprint = async () => {
    const fingerprint = generateFingerprint();
    setStatusMessage("Generating fingerprint...");

    try {
      const response = await axios.post(
        "http://localhost:3001/register-device",
        {
          fingerprint, // Send fingerprint directly to the backend
        }
      );

      setStatusMessage(response.data.message);

      if (response.data.success) {
        setShowNotification(true); // Show notification upon success
        setTimeout(() => {
          setShowNotification(false);
          navigate("/login"); // Redirect to login after 2 seconds
        }, 2000); // Hide notification after 2 seconds
      }
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message || "Failed to register the device."
      );
    }
  };

  return (
    <div className="register-device-container">
      <div className="register-device-card">
        <h2>Register Your Device</h2>

        {!isAdminLoggedIn ? (
          <>
            <p>Please enter the admin password to proceed:</p>
            <div className="input-group">
              <label htmlFor="admin-password">Admin Password</label>
              <input
                type="password"
                id="admin-password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            <button onClick={handleAdminLogin} className="login-button">
              Login
            </button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </>
        ) : (
          <>
            <p>Welcome Admin! Now you can generate a device fingerprint:</p>
            <button
              onClick={handleGenerateFingerprint}
              className="generate-button"
            >
              Generate Fingerprint
            </button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </>
        )}
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="notification success">
          <p>Device registered successfully!</p>
        </div>
      )}
    </div>
  );
};

export default RegisterDevice;

// // import { useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// // import { useNavigate } from "react-router-dom";
// // import "./RegisterDevice.css";

// // // Function to register device (will be used by React Query)
// // const registerDevice = async (fingerprint) => {
// //   const response = await fetch("http://localhost:3001/register-device", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({ fingerprint }),
// //   });

// //   if (!response.ok) {
// //     throw new Error("Failed to register device");
// //   }

// //   return response.json();
// // };

// // const RegisterDevice = () => {
// //   const [adminPassword, setAdminPassword] = useState("");
// //   const [statusMessage, setStatusMessage] = useState("");
// //   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
// //   const [showNotification, setShowNotification] = useState(false);
// //   const navigate = useNavigate();

// //   // React Query mutation for device registration
// //   const registerDeviceMutation = useMutation(registerDevice, {
// //     onSuccess: (data) => {
// //       setStatusMessage(data.message);
// //       setShowNotification(true);

// //       // Redirect after success
// //       setTimeout(() => {
// //         setShowNotification(false);
// //         navigate("/login");
// //       }, 2000);
// //     },
// //     onError: (error) => {
// //       setStatusMessage(error.message || "Failed to register the device.");
// //     },
// //   });

// //   const handleAdminLogin = () => {
// //     if (adminPassword === "admin123") {
// //       setIsAdminLoggedIn(true);
// //       setStatusMessage("");
// //     } else {
// //       setStatusMessage("Invalid admin password.");
// //     }
// //   };

// //   // Generate device fingerprint
// //   const generateFingerprint = () => {
// //     const userAgent = navigator.userAgent;
// //     const language = navigator.language;
// //     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// //     const screenResolution = `${window.screen.width}x${window.screen.height}`;
// //     const rawFingerprint = `${userAgent}|${language}|${timezone}|${screenResolution}`;
// //     return btoa(rawFingerprint);
// //   };

// //   const handleGenerateFingerprint = () => {
// //     const fingerprint = generateFingerprint();
// //     setStatusMessage("Generating fingerprint...");
// //     registerDeviceMutation.mutate(fingerprint);
// //   };

// //   return (
// //     <div className="register-device-container">
// //       <div className="register-device-card">
// //         <h2 className="h2">Register Your Device</h2>
// //         {!isAdminLoggedIn ? (
// //           <>
// //             <p className="p">Please enter the admin password to proceed:</p>
// //             <div className="input-group">
// //               <label htmlFor="admin-password">Admin Password</label>
// //               <input
// //                 type="password"
// //                 id="admin-password"
// //                 placeholder="Enter admin password"
// //                 value={adminPassword}
// //                 onChange={(e) => setAdminPassword(e.target.value)}
// //               />
// //             </div>
// //             <button onClick={handleAdminLogin} className="login-button button">
// //               Login
// //             </button>
// //             {statusMessage && (
// //               <p className="status-message p">{statusMessage}</p>
// //             )}
// //           </>
// //         ) : (
// //           <>
// //             <p className="p">
// //               Welcome Admin! Now you can generate a device fingerprint:
// //             </p>
// //             <button
// //               onClick={handleGenerateFingerprint}
// //               className="generate-button button"
// //               disabled={registerDeviceMutation.isLoading}
// //             >
// //               {registerDeviceMutation.isLoading
// //                 ? "Generating..."
// //                 : "Generate Fingerprint"}
// //             </button>
// //             {statusMessage && (
// //               <p className="status-message p">{statusMessage}</p>
// //             )}
// //           </>
// //         )}
// //       </div>
// //       {/* Notification */}
// //       {showNotification && (
// //         <div className="notification success">
// //           <p className="p">Device registered successfully!</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default RegisterDevice;
// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import "./RegisterDevice.module.css";

// // Function to register device (will be used by React Query)
// const registerDevice = async (fingerprint) => {
//   const response = await fetch("http://localhost:3001/register-device", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ fingerprint }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to register device");
//   }

//   return response.json();
// };

// const RegisterDevice = () => {
//   const [adminPassword, setAdminPassword] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const navigate = useNavigate();

//   // React Query mutation for device registration
//   const registerDeviceMutation = useMutation(registerDevice, {
//     onSuccess: (data) => {
//       setStatusMessage(data.message);
//       setShowNotification(true);

//       // Redirect after success
//       setTimeout(() => {
//         setShowNotification(false);
//         navigate("/login");
//       }, 2000);
//     },
//     onError: (error) => {
//       setStatusMessage(error.message || "Failed to register the device.");
//     },
//   });

//   const handleAdminLogin = () => {
//     if (adminPassword === "admin123") {
//       setIsAdminLoggedIn(true);
//       setStatusMessage("");
//     } else {
//       setStatusMessage("Invalid admin password.");
//     }
//   };

//   // Generate device fingerprint
//   const generateFingerprint = () => {
//     const userAgent = navigator.userAgent;
//     const language = navigator.language;
//     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const screenResolution = `${window.screen.width}x${window.screen.height}`;
//     const rawFingerprint = `${userAgent}|${language}|${timezone}|${screenResolution}`;
//     return btoa(rawFingerprint);
//   };

//   const handleGenerateFingerprint = () => {
//     const fingerprint = generateFingerprint();
//     setStatusMessage("Generating fingerprint...");
//     registerDeviceMutation.mutate(fingerprint);
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="register-device-container">
//         <div className="register-device-card">
//           <h2 className="h2">Register Your Device</h2>
//           {!isAdminLoggedIn ? (
//             <>
//               <p className="p">Please enter the admin password to proceed:</p>
//               <div className="input-group">
//                 <label htmlFor="admin-password">Admin Password</label>
//                 <input
//                   type="password"
//                   id="admin-password"
//                   placeholder="Enter admin password"
//                   value={adminPassword}
//                   onChange={(e) => setAdminPassword(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleAdminLogin}
//                 className="login-button button"
//               >
//                 Login
//               </button>
//               {statusMessage && (
//                 <p className="status-message p">{statusMessage}</p>
//               )}
//             </>
//           ) : (
//             <>
//               <p className="p">
//                 Welcome Admin! Now you can generate a device fingerprint:
//               </p>
//               <button
//                 onClick={handleGenerateFingerprint}
//                 className="generate-button button"
//                 disabled={registerDeviceMutation.isLoading}
//               >
//                 {registerDeviceMutation.isLoading
//                   ? "Generating..."
//                   : "Generate Fingerprint"}
//               </button>
//               {statusMessage && (
//                 <p className="status-message p">{statusMessage}</p>
//               )}
//             </>
//           )}
//         </div>
//         {/* Notification */}
//         {showNotification && (
//           <div className="notification success">
//             <p className="p">Device registered successfully!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegisterDevice;
