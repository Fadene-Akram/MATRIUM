import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordRecovery.css';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (!codeSent) {
      // Step 1: Send the verification code
      if (!email || !phone) {
        setMessage('Please provide both email and phone number.');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/send-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
        });
        const data = await response.json();
        if (data.success) {
          setMessage('Verification code sent to your phone.');
          setCodeSent(true);
        } else {
          setMessage(data.message || 'Failed to send verification code.');
        }
      } catch (error) {
        setMessage('An error occurred while sending the verification code.');
      }
    } else if (!isVerified) {
      // Step 2: Verify the OTP
      if (!verificationCode) {
        setMessage('Please enter the verification code.');
        return;
      }
      try {
        const response = await fetch('/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, code: verificationCode }),
        });
        const data = await response.json();
        if (data.success) {
          setMessage('Phone number verified!');
          setIsVerified(true);
        } else {
          setMessage(data.message || 'Invalid verification code.');
        }
      } catch (error) {
        setMessage('An error occurred while verifying the code.');
      }
    } else {
      // Step 3: Proceed to password recovery
      localStorage.setItem('email', email);
      navigate('/reset-password');
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <h2>Password Recovery</h2>
        <p>Enter your email and phone number to reset your password.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={codeSent}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              disabled={codeSent}
            />
          </div>
          {codeSent && (
            <div className="input-group">
              <label htmlFor="verificationCode">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter the code sent to your phone"
                required
              />
            </div>
          )}
          <button type="button" onClick={handleButtonClick} className="recovery-button">
            {isVerified ? 'Recover Password' : codeSent ? 'Verify Code' : 'Send Verification Code'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordRecovery;