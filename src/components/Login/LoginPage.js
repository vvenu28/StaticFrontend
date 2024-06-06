import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../../logo.jpg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful', data);
        sessionStorage.setItem('userID', data.userID); // Store userID in localStorage
        navigate('/dashboard');
      } else {
        alert(data.error);
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };


  return (
    <div className="login-container">
      <div className="login-logo">
        {/* Logo image goes here */}
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-login">Login</button>
            <Link to="/forgot-password" className="btn-forgot-password">Forgot Password?</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </div>
        </form>
        
        
      </div>
    </div>
  );
}

export default LoginPage;
