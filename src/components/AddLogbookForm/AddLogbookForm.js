import React, { useState } from 'react';
import './AddLogbookForm.css';

const AddLogbookForm = ({ onSubmit, onCancel }) => {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [logBookNumber, setLogBookNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  
//   const [pdfFile, setPdfFile] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('selectedComponent', selectedComponent);
  formData.append('logBookNumber', logBookNumber);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('pdf', pdfFile); // Assuming 'pdf' is the correct field name expected by the backend
  
  // Perform the API call
  try {
    const response = await fetch('http://localhost:3001/api/addLogbook', {
      method: 'POST',
      body: formData,
     
    });
    
    // Handle the response from the server
    if (response.ok) {
      const result = await response.json();
      onSubmit(result); // Handle the successful result
    } else {
      // Handle errors if the response is not ok
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle the error state appropriately
  }
};


  return (
    <div className="add-pdf-form">
      <form onSubmit={handleSubmit}>
        <h2>Logbook Information</h2>
         
        {/* Selection of the component for which the logbook is being submitted */}
        <div className="form-group">
          <label>Which logbook are you submitting?</label>
          <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
            <option value="">Select Component</option>
            <option value="Airframe">Airframe</option>
            <option value="Engine 1">Engine 1</option>
            <option value="Engine 2">Engine 2</option>
            <option value="Engine 3">Engine 3</option>
            <option value="APU">APU</option>
          </select>
        </div>
        
        {/* Selection of logbook number */}
        <div className="form-group">
          <label>Logbook Number:</label>
          <input type="number" min="0" value={logBookNumber} onChange={(e) => setLogBookNumber(e.target.value)} />
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



export default AddLogbookForm;

// Airframe_logbook_1.pdf
// Engine1_logbook_1.pdf
// APU_logbook_1.pdf