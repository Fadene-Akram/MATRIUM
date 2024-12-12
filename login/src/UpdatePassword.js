import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  // Send the verification code
  const handleSendCode = async () => {
    try {
      const response = await fetch('/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      setMessage(data.message || 'Verification code sent!');
      setCodeSent(true);
    } catch (error) {
      setMessage('Failed to send verification code.');
    }
  };

  // Verify the code
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: verificationCode }),
      });
      const data = await response.json();
      if (data.message === 'Verification successful!') {
        setIsVerified(true);
        setMessage('Phone number verified!');
      } else {
        setMessage(data.message || 'Invalid verification code.');
      }
    } catch (error) {
      setMessage('Verification failed.');
    }
  };

  // Handle password update
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!isVerified) {
      setMessage('Please verify your phone number before updating the password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setMessage('Your password has been updated successfully!');
    setTimeout(() => {
      navigate('/'); // Redirect to the login page after successful update
    }, 2000);
  };

  return (
    <div className="update-container">
      <div className="update-card">
        <h2>Update Your Password</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>
          {!codeSent && (
            <button type="button" onClick={handleSendCode} className="send-code-button">
              Send Verification Code
            </button>
          )}
          {codeSent && !isVerified && (
            <>
              <div className="input-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                />
              </div>
              <button type="button" onClick={handleVerifyCode} className="verify-code-button">
                Verify Code
              </button>
            </>
          )}
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="update-button">Update Password</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default UpdatePassword;
