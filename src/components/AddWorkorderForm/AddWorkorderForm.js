import React, { useState } from 'react';
import './AddWorkorderForm.css';

const AddWorkorderForm = ({ onSubmit, onCancel, formType }) => {
  const [workorderNumber, setworkorderNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the PDF file and other form data
    const formData = new FormData();
    formData.append('workorderNumber', workorderNumber);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('pdf', pdfFile);

    // Pass the form data up to the parent component
  
 
   // Perform the API call
   try {
    const response = await fetch('http://localhost:3001/api/addWorkOrder', {
      method: 'POST',
      body: formData,
     
    });
    
    // Handle the response from the server
    if (response.ok) {
      const result = await response.json();
      onSubmit(result); // Handle the successful resulta
    } else {
      // Handle errors if the response is not ok
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle the error state appropriately
  }
    // Perform the API call
  
};

  return (
    <div className="add-pdf-form">
      <form onSubmit={handleSubmit}>
        <h2>Logbook Information</h2>
        
        {/* Selection of logbook number */}
        <div className="form-group">
          <label>Work Order Number:</label>
          <input type="number" min="0" value={workorderNumber} onChange={(e) => setworkorderNumber(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Start date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label>End date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        
        {/* Upload PDF */}
        <div className="form-group">
          <label>Upload PDF:</label>
          <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
        </div>
        
        {/* Submit button */}
        <div className="form-group actions">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkorderForm;