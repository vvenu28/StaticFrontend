import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './RegisterPage1.css'; // Add this line at the top of your file

function RegisterPage1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Assuming the backend endpoint for registration is '/register'
    const endpoint = 'http://localhost:3001/register1'; 

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the next registration step on success
      alert("Register success, Moved to Company Registration");
      sessionStorage.setItem('userID', data.userID);
      navigate('/register-step2');
      } else {
        // Handle any errors returned from the server
        throw new Error(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <div className="input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="password-input"
        />
        <span className="toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      <div className="input-container">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="password-input"
        />
        <span className="toggle" onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      <button type="submit">Next</button>
    </form>
  </div>
);
}

export default RegisterPage1;
