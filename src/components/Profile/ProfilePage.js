import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [state, setState] = useState({
    companyName: '',
    companyPhoneNumber: '',
    companyHeadquartersAddress: '',
    aircraftHangarAddress: '',
    aircraftOwnerName: '',
    companyRepresentativeName: '',
    companyRepresentativeContactNumber: '',
    companyRepresentativeEmailAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Client-side validation could be added here
    console.log('Sending data to server:', state);
    fetch('http://localhost:3001/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    }).then(response => response.json())
      .then(data => alert(`Profile Updated: ${data.message}`))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="profile-page">
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit}>
        {/* Simplified rendering using map */}
        {Object.keys(state).map(key => (
          <label key={key}>
            {key.replace(/([A-Z])/g, ' $1').trim()}
            <input
              type="text"
              name={key}
              value={state[key]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
