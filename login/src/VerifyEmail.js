import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerifyCode = (e) => {
    e.preventDefault();

    // Simulate verifying the code (For demo, we use a fixed code '123456')
    if (verificationCode === '123456') {
      setIsCodeVerified(true);
      setMessage('Email verified successfully! You can now reset your password.');
      setTimeout(() => {
        navigate('/update-password'); // Redirect to the password update page
      }, 2000);
    } else {
      setMessage('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify Your Email</h2>
        <p>A verification code has been sent to your email address. Please enter it below.</p>
        <form onSubmit={handleVerifyCode}>
          <div className="input-group">
            <label htmlFor="verificationCode">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter the code sent to your email"
              required
            />
          </div>
          <button type="submit" className="verify-button">Verify Code</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
