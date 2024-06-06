import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage2.css';

function RegisterPage2() {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    companyPhoneNumber: '',
    headquartersAddress: '',
    hangarAddress: '',
    aircraftOwnerName: '',
    companyRepName: '',
    companyRepContact: '',
    companyRepEmail: '',
    tailNumberPhoto: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setCompanyInfo({ ...companyInfo, tailNumberPhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get userId from session
    const userID = sessionStorage.getItem('userID');
    console.log("UserID:", userID);

    if (!userID) {
    console.log("Missing USER ID");
    setError('User ID is missing. Please register or log in.');
    return;
    }
    console.log(userID);
    //Create a form data
    const formData = new FormData();
    // Append the text fields
    formData.append('userID', userID);
    formData.append('companyName', companyInfo.companyName);
    formData.append('companyPhoneNumber', companyInfo.companyPhoneNumber);
    formData.append('headquartersAddress', companyInfo.headquartersAddress);
    formData.append('hangarAddress', companyInfo.hangarAddress);
    formData.append('aircraftOwnerName', companyInfo.aircraftOwnerName);
    formData.append('companyRepName', companyInfo.companyRepName);
    formData.append('companyRepContact', companyInfo.companyRepContact);
    formData.append('companyRepEmail', companyInfo.companyRepEmail);
    formData.append('tailNumberPhoto', companyInfo.tailNumberPhoto);

    try {
      const response = await fetch('http://localhost:3001/api/register2', {
        method: 'POST',
        body: formData, // FormData is sent without setting Content-Type in the headers
      });

      if(response.ok){
      const result = await response.json();
      console.log('Company Registered:', result);
      alert('Company Registered, Move to aircraft registration');
      //Navigate to Aircraft Register Page
      navigate('/aircraft-register');
      setError('');
      }
      else {
      throw new Error('Network response was not ok');
      }


    } catch (err) {
      setError("Failed to register company: " + (err.message || "Unknown error"));
    }
  };


  return (
    <div className="register-container">
      <h2 className="register-title">Company Information</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={companyInfo.companyName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="companyPhoneNumber"
          placeholder="Company Phone Number"
          value={companyInfo.companyPhoneNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="headquartersAddress"
          placeholder="Company Headquarters Address"
          value={companyInfo.headquartersAddress}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="hangarAddress"
          placeholder="Aircraft Hangar Address"
          value={companyInfo.hangarAddress}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="aircraftOwnerName"
          placeholder="Aircraft Owner Name"
          value={companyInfo.aircraftOwnerName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="companyRepName"
          placeholder="Company Representative Name"
          value={companyInfo.companyRepName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="companyRepContact"
          placeholder="Company Representative Contact Number"
          value={companyInfo.companyRepContact}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="companyRepEmail"
          placeholder="Company Representative Email Address"
          value={companyInfo.companyRepEmail}
          onChange={handleInputChange}
          required
        />
        <div className="file-input-container">
          <label htmlFor="tailNumberPhoto">Photo of Tail Number:</label>
          <input
            type="file"
            id="tailNumberPhoto"
            name="tailNumberPhoto"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage2;
