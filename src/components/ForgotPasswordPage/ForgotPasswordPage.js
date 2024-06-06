import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css'; // Ensure this CSS file is linked properly
import logo from '../../logo.jpg'; // Import the logo image here

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API endpoint for forgot password
    const apiUrl = 'http://localhost:3001/api/forgot-password';

    // Prepare the JSON payload
    const payload = JSON.stringify({ email });

    // Perform the API call with JSON
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      // Handle the response from the server
      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Display success message via alert or update the UI accordingly
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      console.error('Error submitting forgot password form:', error);
      alert(error.message); // Display error message via alert or update the UI accordingly
    }  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-logo">
        {/* Logo image can be reused */}
        <img src={logo} alt="Logo" />
      </div>
      <div className="forgot-password-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-reset-password">Send Reset Link</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
