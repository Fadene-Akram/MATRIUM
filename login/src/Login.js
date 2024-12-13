import React, { useEffect, useState } from "react";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [deviceFingerprint, setDeviceFingerprint] = useState("");
  const [message, setMessage] = useState("");

  // Generate device fingerprint on component mount
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    const fingerprint = btoa(
      `${userAgent}|${language}|${timezone}|${screenResolution}`
    );

    setDeviceFingerprint(fingerprint);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        fingerprint: deviceFingerprint,
      });

      if (response.data.success) {
        setMessage("Login successful!");
        // Redirect or handle successful login
        navigate("/dashboard");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <div className="form-container">
            <h2>Welcome back!</h2>
            <h3>Please Sign In</h3>

            <button
              className="sign-in-button"
              onClick={handleLogin}
              disabled={!deviceFingerprint}
            >
              Sign In
            </button>

            {message && <p className="error-message">{message}</p>}

            <button
              className="sign-up-button"
              onClick={() => navigate("/register-device")}
            >
              Register Device
            </button>
          </div>
        </div>
        <div className="right-section">
          <FaUser className="user-icon" />
        </div>
      </div>
    </div>
  );
};

export default Login;