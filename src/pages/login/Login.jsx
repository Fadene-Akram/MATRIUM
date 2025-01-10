// login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import generateFingerprint from "../../utils/fingerprint";

// Styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f7fb;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px 50px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease-in-out;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const SubHeading = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 15px;
  color: white;

  ${(props) =>
    props.primary &&
    `
    background-color: #4CAF50;
    &:hover {
      background-color: #45a049;
    }
  `}

  ${(props) =>
    props.secondary &&
    `
    background-color: #2196F3;
    &:hover {
      background-color: #1e88e5;
    }
  `}
`;

const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.error ? "#f44336" : "#4CAF50")};
`;

const RegisterDevice = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    const fingerprint = generateFingerprint();

    if (fingerprint === deviceFingerprint) {
      setIsAdminLoggedIn(true);
      setStatusMessage("Welcome! Privileged login successful.");
      setTimeout(() => navigate("/Dashboard"), 2000);
    } else {
      setStatusMessage("Invalid admin access.");
    }
  };

  const handleRegisterDevice = () => {
    const newFingerprint = generateFingerprint();
    setDeviceFingerprint(newFingerprint);
    setStatusMessage("Device registered successfully!");

    setTimeout(() => {
      setStatusMessage("");
    }, 5000); // Clear notification after 5 seconds
  };

  return (
    <Container>
      <Card>
        <Heading>Register or Login</Heading>
        <SubHeading>Choose an option below to proceed</SubHeading>

        {!isAdminLoggedIn ? (
          <>
            <Button primary onClick={handleAdminLogin}>
              Login
            </Button>
            <Button secondary onClick={handleRegisterDevice}>
              Register Device
            </Button>
            {statusMessage && (
              <StatusMessage error={statusMessage.includes("Invalid")}>
                {statusMessage}
              </StatusMessage>
            )}
          </>
        ) : (
          <StatusMessage>{statusMessage}</StatusMessage>
        )}
      </Card>
    </Container>
  );
};

export default RegisterDevice;
