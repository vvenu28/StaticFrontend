import React, { useState } from 'react';

const EngineTab = ({ engineNum, onNext, isApu }) => {
  // State hooks for each form field
  const [engineType, setEngineType] = useState('');
  const [engineSerialNumber, setEngineSerialNumber] = useState('');
  const [dateOfManufacture, setDateOfManufacture] = useState('');
  const [asOfDate, setAsOfDate] = useState('');
  const [enTime, setEnTime] = useState('');
  const [enCycle, setEnCycle] = useState('');
  const [original, setOriginal] = useState('');
  const [removed, setRemoved] = useState('');
  const [matchesAirframe, setMatchesAirframe] = useState('');
  const [showReinstallDetails, setShowReinstallDetails] = useState(false);

  // To track if the next question should be displayed
  const [showRemovedQuestion, setShowRemovedQuestion] = useState(false);
  const [showMatchesAirframeQuestion, setShowMatchesAirframeQuestion] = useState(false);

  // New state variables for the engine installation details
  const [engineInstallationDate, setEngineInstallationDate] = useState('');
  const [engineInstallationAcTime, setEngineInstallationAcTime] = useState('');
  const [engineInstallationAcCycle, setEngineInstallationAcCycle] = useState('');
  const [engineInstallationEngTime, setEngineInstallationEngTime] = useState('');
  const [engineInstallationEngCycle, setEngineInstallationEngCycle] = useState('');

  const [airframeLogBooks, setAirframeLogBooks] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);

  // Adjust existing handlers and add new ones as necessary
  const handleMatchesAirframeChange = (e) => {
    const value = e.target.value;
    setMatchesAirframe(value);
    setShowReinstallDetails(value === 'No'); // Show reinstall details if "No"
  };

  const handleOriginalChange = (e) => {
    const value = e.target.value;
    setOriginal(value);
    setShowRemovedQuestion(value === 'Yes');
    setShowMatchesAirframeQuestion();
    setShowReinstallDetails(false);

    // Reset the related state if the engine is not original
    if (value === 'No') {
      setShowReinstallDetails(true);
    } else {
      // Hide and reset the engine installation details if the engine is original
      setShowReinstallDetails(false);
      setEngineInstallationDate('');
      setEngineInstallationAcTime('');
      setEngineInstallationAcCycle('');
      setEngineInstallationEngTime('');
      setEngineInstallationEngCycle('');
    }
  };

  const handleRemovedChange = (e) => {
    const value = e.target.value;
    setRemoved(value);
    setShowMatchesAirframeQuestion(value === 'Yes' || value === 'No'); // Show next question based on both Yes or No
  };

  // Handle form submission
  const handleEngineSubmit = async (e) => {
    e.preventDefault();
    // Retrieve MMS from sessionStorage
    const MMS = sessionStorage.getItem('MMS');
    if (!MMS) {
      console.error('MMS is not available. Cannot submit engine form.');
      return;
    }
    // Process form data here or send to an API
    // Create a FormData object to programmatically build the engine form data
    const engineFormData = new FormData();

    // Append the text fields
    engineFormData.append('Engine_Num', engineNum); // Set Engine_Num to 1
    engineFormData.append('MMS', MMS);
    engineFormData.append('Engine_Type', engineType);
    engineFormData.append('Engine_SN', engineSerialNumber);
    engineFormData.append('Date_of_Manufacture', dateOfManufacture);
    engineFormData.append('As_of_Date', asOfDate);
    engineFormData.append('Engine_Time', enTime);
    engineFormData.append('Engine_Cycle', enCycle);
    engineFormData.append('Original', original);
    engineFormData.append('Removed', removed);
    engineFormData.append('Matches_Airframe', matchesAirframe);
    // Append the engine installation details if available
    if (showReinstallDetails) {
      engineFormData.append('Engine_Installation_Date', engineInstallationDate);
      engineFormData.append('Engine_Installation_AC_Time', engineInstallationAcTime);
      engineFormData.append('Engine_Installation_AC_Cycle', engineInstallationAcCycle);
      engineFormData.append('Engine_Installation_Eng_Time', engineInstallationEngTime);
      engineFormData.append('Engine_Installation_Eng_Cycle', engineInstallationEngCycle);
    }

    // Append the file. Assuming 'pdfFile' is the file we want to upload
    if (pdfFile) {
      engineFormData.append('pdf', pdfFile);
    }

    try {
      const engineResponse = await fetch('http://localhost:3001/api/addEngineForm', {
        method: 'POST',
        body: engineFormData, // Use engineFormData instead of formData
      });

      if (!engineResponse.ok) {
        throw new Error('Network response for adding engine was not ok');
      }

      const engineData = await engineResponse.json();
      console.log('Engine data:', engineData); // Handle success. You might want to redirect or update the UI accordingly.
      onNext(); // Call onNext to navigate to the next tab or dashboard

    } catch (engineError) {
      console.error('Error during the engine fetch operation:', engineError.message);
      // Handle errors, such as by showing an error message to the user
    }
    console.log({
      Engine_Num: 1,
      MMS,
      engineType,
      engineSerialNumber,
      dateOfManufacture,
      asOfDate,
      enTime,
      enCycle,
      original,
      removed,
      matchesAirframe,
    });
  };

  const handleManufactureDateChange = (e) => {
    const newManufactureDate = e.target.value;
    setDateOfManufacture(newManufactureDate);
    if (asOfDate && newManufactureDate > asOfDate) {
      // If the new manufacture date is after the service date, reset the service date
      setAsOfDate('');
    }
  };

  return (
    <div className="engine-form">
      <h2>Let's get some of the basic info about your aircraft - {isApu ? 'APU' : `Engine #${engineNum}`}</h2>
      <form onSubmit={handleEngineSubmit}>
        <label>
          Engine Type
          <select
            value={engineType}
            onChange={(e) => setEngineType(e.target.value)}
          >
            <option value="">Select Type</option>
            {/* Populate with actual aircraft types */}
            <option value="AirResearch">AirResearch</option>
            <option value="AlliedSignal">Allied Signal</option>
            <option value="AVCOLycoming">AVCO Lycoming</option>
            <option value="BMWRollsRoyce">BMW-Rolls Royce</option>
            <option value="CFE">CFE</option>
            <option value="Garrett">Garrett</option>
            <option value="GE">GE</option>
            <option value="GEPassport">GE Passport</option>
            <option value="Honeywell">Honeywell</option>
            <option value="PrattWhitney">Pratt & Whitney</option>
            <option value="RollsRoyce">Rolls-Royce</option>
            <option value="RRPearl">RR Pearl</option>
            <option value="Williams">Williams</option>
          </select>
        </label>

        <label>
          Engine SN
          <input
            type="text"
            value={engineSerialNumber}
            onChange={(e) => setEngineSerialNumber(e.target.value)}
          />
        </label>

        <label>
          Date of Manufacture
          <input
            type="date"
            value={dateOfManufacture}
            onChange={handleManufactureDateChange}
          />
        </label>

        <label>
          As of Date
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            min={dateOfManufacture} // ensures entry date is not before manufacture date
          />
        </label>

        <label>
          Engine Time
          <input
            type="text"
            value={enTime}
            onChange={(e) => setEnTime(e.target.value)}
          />
        </label>

        <label>
          Engine Cycle
          <input
            type="text"
            value={enCycle}
            onChange={(e) => setEnCycle(e.target.value)}
          />
        </label>

        <h2>How many logbooks do you have for this component?</h2>
        <div className="form-group">
          <input type="number" min="0" value={airframeLogBooks} onChange={(e) => setAirframeLogBooks(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Upload PDF:</label>
          <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
        </div>

        <div className="foreign-registered">
          <p>Is this engine original to the aircraft?</p>
          <label>
            <input
              type="radio"
              name="originalEngine"
              value="Yes"
              checked={original === 'Yes'}
              onChange={handleOriginalChange}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="originalEngine"
              value="No"
              checked={original === 'No'}
              onChange={handleOriginalChange}
            />
            No
          </label>

          <label>
            <input
              type="radio"
              name="originalEngine"
              value="Unknown"
              checked={original === 'Unknown'}
              onChange={handleOriginalChange}
            />
            I don't know
          </label>
        </div>

        {showRemovedQuestion && (
          <div className="foreign-registered">
            <p>Has this engine ever been removed?</p>
            {/* Adjust the name attribute for these radio buttons to differentiate them from the previous set */}
            <label>
              <input
                type="radio"
                name="engineRemoved"
                value="Yes"
                checked={removed === 'Yes'}
                onChange={handleRemovedChange}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="engineRemoved"
                value="No"
                checked={removed === 'No'}
                onChange={handleRemovedChange}
              />
              No
            </label>

            <label>
              <input
                type="radio"
                name="engineRemoved"
                value="Unknown"
                checked={removed === 'Unknown'}
                onChange={handleRemovedChange}
              />
              I don't know
            </label>
          </div>
        )}

        {showMatchesAirframeQuestion && (
          <div className="matches-airframe">
            <p>Does the engine time/cycle count match the airframe?</p>
            <label>
              <input
                type="radio"
                name="matchesAirframe"
                value="Yes"
                checked={matchesAirframe === 'Yes'}
                onChange={handleMatchesAirframeChange}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="matchesAirframe"
                value="No"
                checked={matchesAirframe === 'No'}
                onChange={handleMatchesAirframeChange}
              />
              No
            </label>
          </div>
        )}

        {showReinstallDetails && (
          <div className="engine-installation-details">
            <h3>When was this engine last installed?</h3>
            <label>
              Eng Installed on
              <input
                type="date"
                value={engineInstallationDate}
                onChange={(e) => setEngineInstallationDate(e.target.value)}
              />
            </label>
            <label>
              AC Time
              <input
                type="number"
                value={engineInstallationAcTime}
                onChange={(e) => setEngineInstallationAcTime(e.target.value)}
              />
            </label>
            <label>
              AC Cycle
              <input
                type="number"
                value={engineInstallationAcCycle}
                onChange={(e) => setEngineInstallationAcCycle(e.target.value)}
              />
            </label>
            <label>
              Eng Time
              <input
                type="number"
                value={engineInstallationEngTime}
                onChange={(e) => setEngineInstallationEngTime(e.target.value)}
              />
            </label>
            <label>
              Eng Cycle
              <input
                type="number"
                value={engineInstallationEngCycle}
                onChange={(e) => setEngineInstallationEngCycle(e.target.value)}
              />
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EngineTab;
