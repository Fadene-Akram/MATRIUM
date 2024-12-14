// import { useEffect, useState } from "react";
// import styles from "./Login.module.css";
// import { FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const [deviceFingerprint, setDeviceFingerprint] = useState("");
//   const [message, setMessage] = useState("");

//   // Generate device fingerprint on component mount
//   useEffect(() => {
//     const userAgent = navigator.userAgent;
//     const language = navigator.language;
//     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const screenResolution = `${window.screen.width}x${window.screen.height}`;

//     const fingerprint = btoa(
//       `${userAgent}|${language}|${timezone}|${screenResolution}`
//     );

//     setDeviceFingerprint(fingerprint);
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/login", {
//         fingerprint: deviceFingerprint,
//       });

//       if (response.data.success) {
//         setMessage("Login successful!");
//         // Redirect or handle successful login
//         navigate("/");
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       setMessage("An error occurred during login.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="left-section">
//           <div className="form-container">
//             <h2>Welcome back!</h2>
//             <h3>Please Sign In</h3>

//             <button
//               className="sign-in-button"
//               onClick={handleLogin}
//               disabled={!deviceFingerprint}
//             >
//               Sign In
//             </button>

//             {message && <p className="error-message">{message}</p>}

//             <button
//               className="sign-up-button"
//               onClick={() => navigate("/register-device")}
//             >
//               Register Device
//             </button>
//           </div>
//         </div>
//         <div className="right-section">
//           <FaUser className="user-icon" />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Login;
/*
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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

  const loginMutation = useMutation(
    async () => {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: deviceFingerprint }),
      });

      if (!response.ok) {
        throw new Error("An error occurred during login.");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setMessage("Login successful!");
          navigate("/");
        } else {
          setMessage(data.message);
        }
      },
      onError: (error) => {
        setMessage(error.message);
        console.error(error);
      },
    }
  );

  const handleLogin = () => {
    if (deviceFingerprint) {
      loginMutation.mutate();
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <div className={styles["left-section"]}>
          <div className={styles["form-container"]}>
            <h2 className={styles["h2"]}>Welcome back!</h2>
            <h3 className={styles["h3"]}>Please Sign In</h3>

            <div className={styles["input-group"]}>
              <label className={styles["input-label"]}>Fingerprint</label>
              <p>{deviceFingerprint}</p>
            </div>

            <button
              className={styles["sign-in-button"]}
              onClick={handleLogin}
              disabled={!deviceFingerprint || loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Signing In..." : "Sign In"}
            </button>

            {message && <p className={styles["error-message"]}>{message}</p>}

            <button
              className={styles["sign-up-button"]}
              onClick={() => navigate("/register-device")}
            >
              Register Device
            </button>
          </div>
        </div>
        <div className={styles["right-section"]}>
          <FaUser className={styles["user-icon"]} />
        </div>
      </div>
    </div>
  );
};

export default Login;
*/ 
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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

  const loginMutation = useMutation(
    async () => {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: deviceFingerprint }),
      });

      if (!response.ok) {
        throw new Error("An error occurred during login.");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setMessage("Login successful!");
          navigate("/");
        } else {
          setMessage(data.message);
        }
      },
      onError: (error) => {
        setMessage(error.message);
        console.error(error);
      },
    }
  );

  const handleLogin = () => {
    if (deviceFingerprint) {
      loginMutation.mutate();
    }
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["login-container"]}>
        <div className={styles["login-card"]}>
          <div className={styles["left-section"]}>
            <div className={styles["form-container"]}>
              <h2 className={styles["h2"]}>Welcome back!</h2>
              <h3 className={styles["h3"]}>Please Sign In</h3>

              <div className={styles["input-group"]}>
                <label className={styles["input-label"]}>Fingerprint</label>
                <p className={styles["fingerprint-display"]}>
                  {deviceFingerprint}
                </p>
              </div>

              <button
                className={styles["sign-in-button"]}
                onClick={handleLogin}
                disabled={!deviceFingerprint || loginMutation.isLoading}
              >
                {loginMutation.isLoading ? "Signing In..." : "Sign In"}
              </button>

              {message && (
                <p className={styles["error-message"]}>{message}</p>
              )}

              <button
                className={styles["sign-up-button"]}
                onClick={() => navigate("/register-device")}
              >
                Register Device
              </button>
            </div>
          </div>
          <div className={styles["right-section"]}>
            <FaUser className={styles["user-icon"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
