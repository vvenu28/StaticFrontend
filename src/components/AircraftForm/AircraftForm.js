import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Assuming your CSS file is named App.css and is in the same src directory
import './AircraftForm.css'; // Adjust the path if necessary
import EngineTab from './EngineTab'; // Import EngineTab component

// Helper function to generate a range of serial numbers
const generateSerialNumbers = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => (start + index).toString().padStart(3, '0'));
};

const typeTabs = {
  'CJ1525': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'CJ1+525': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation V560': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Ultra560': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Bravo550': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Encore560': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Encore+560': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Excel560XL': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Excel560XLS': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation Excel Plus560XLS+': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation III650': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation VI650': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation VII650': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Sovereign680': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Sovereign+680+': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Latitude680A': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Longitude700': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'CitationX750': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Citation X Plus750+': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],  //19

  'AstraSPX': ['Aircraft', 'Engine #1', 'Engine #2'],
  'G100': ['Aircraft', 'Engine #1', 'Engine #2'],
  'G150': ['Aircraft', 'Engine #1', 'Engine #2'],
  'GGalaxy': ['Aircraft', 'Engine #1', 'Engine #2'],
  'G200': ['Aircraft', 'Engine #1', 'Engine #2'],  //24

  'G280': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'GIV': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G300': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G400': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G450': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'GV': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G550': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'GVI': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G500': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G600': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G650': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'G650ER': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],  //37

  'Falcon10': ['Aircraft', 'Engine #1', 'Engine #2'],  //38

  'Falcon2000': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Falcon2000EX': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Falcon 2000EX EASy': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Falcon 2000DX': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Falcon 2000LX': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Falcon 2000LXS': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Falcon 2000S': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],  //45

  'Falcon7X': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon8X': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon900EX': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon900EZ': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon900LX': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon900DX': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon50': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon50EX': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],
  'Falcon900': ['Aircraft', 'Engine #1', 'Engine #2', 'Engine #3', 'APU'],  //54

  'Challenger300': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger350': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'GlobalExpress': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'GlobalExpressXRS': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Global6000': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Global6500': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Global5000': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Global5000GVFD': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Global5500': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Global7500': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger600': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger601': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger601-3A': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger601-3R': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger604': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger605': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],
  'Challenger650': ['Aircraft', 'Engine #1', 'Engine #2', 'APU'],  //71

  'Phenom300': ['Aircraft', 'Engine #1', 'Engine #2'],
  'Phenom100': ['Aircraft', 'Engine #1', 'Engine #2'],
  'Phenom100E': ['Aircraft', 'Engine #1', 'Engine #2'],
  'Phenom300E': ['Aircraft', 'Engine #1', 'Engine #2'],
  'Legacy450': ['Aircraft', 'Engine #1', 'Engine #2'],
  'Legacy500': ['Aircraft', 'Engine #1', 'Engine #2'],  //77
}

const aircraftOptions = {
  Cessna: ['CJ1525', 'CJ1+525', 'Citation V560', 'Citation Ultra560', 'Citation Bravo550', 'Citation Encore560', 'Citation Encore+560', 'Citation Excel560XL',
  'Citation Excel560XLS', 'Citation Excel Plus560XLS+', 'Citation III650', 'Citation VI650', 'Citation VII650',
  'Sovereign680', 'Sovereign+680+', 'Latitude680A', 'Longitude700', 'CitationX750',
  'Citation X Plus750+'],

  Gulfstream: ['AstraSPX', 'G100', 'G150','GGalaxy', 'G200', 'G280',
  'GIV', 'G300', 'G400', 'G450', 'GV','G550', 'GVI', 'G500',
  'G600', 'G650', 'G650ER'],

  Dassualt: ['Falcon10','Falcon2000','Falcon2000EX','Falcon 2000EX EASy',
             'Falcon 2000DX','Falcon 2000LX','Falcon 2000LXS','Falcon 2000S',
             'Falcon7X','Falcon8X','Falcon900EX','Falcon900EZ','Falcon900LX',
             'Falcon900DX','Falcon50','Falcon50EX','Falcon900'],

  Bombardier: ['Challenger300','Challenger350','GlobalExpress',
               'GlobalExpressXRS','Global6000','Global6500','Global5000',
               'Global5000GVFD','Global5500','Global7500','Challenger600',
               'Challenger601','Challenger601-3A','Challenger601-3R','Challenger604',
               'Challenger605','Challenger650'],

  Embrear: ['Phenom300','Phenom100','Phenom100E','Phenom300E','Legacy450','Legacy500'],

  Hawker: ['Hawker1000','Hawker1000A','Hawker1000B','Hawker800','Hawker800A','Hawker800B',
           'Hawker800XP','Hawker850XP','Hawker900XP','Hawker750']

};

const serialNumberRanges = {
  'CJ1525': { start: 1, end: 359 },
  'CJ1+525': { start: 360, end: 1000 },
  'Citation V560': { start: 1, end: 259 },
  'Citation Ultra560': { start: 260, end: 538 },
  'Citation Bravo550': { start: 801, end: 900 },
  'Citation Encore560': { start: 539, end: 750 },
  'Citation Encore+560': { start: 751, end: 815 },
  'Citation Excel560XL': { start: 1, end: 500 },
  'Citation Excel560XLS': { start: 501, end: 6000 },
  'Citation Excel Plus560XLS+': { start: 1, end: 100 },
  'Citation III650': { start: 1, end: 199 },
  'Citation VI650': { start: 207, end: 241 },
  'Citation VII650': { start: 1, end: 119 },
  'Sovereign680': { start: 1, end: 500 },
  'Sovereign+680+': { start: 501, end: 600 },
  'Latitude680A': { start: 1, end: 100 },
  'Longitude700': { start: 1, end: 100 },
  'CitationX750': { start: 1, end: 500 },
  'Citation X Plus750+': { start: 501, end: 600 },
  'AstraSPX': { start: 79, end: 145 },
  'G100': { start: 146, end: 246 },
  'G150': { start: 201, end: 301 },
  'GGalaxy': { start: 5, end: 56 },
  'G200': { start: 57, end: 157 },
  'G280': { start: 2001, end: 2100 },
  'GIV': { start: 1000, end: 1499 },
  'G300': { start: 1500, end: 1535 },
  'G400': { start: 1500, end: 1535 },
  'G450': { start: 4001, end: 4100 },
  'GV': { start: 501, end: 693 },
  'G550': { start: 5001, end: 5100 },
  'GVI': { start: 6001, end: 6100 },
  'G500': { start: 72001, end: 72100 },
  'G600': { start: 73001, end: 73100 },
  'G650': { start: 6001, end: 6100 },
  'G650ER': { start: 6001, end: 6100 },
  'Falcon10': { start: 1, end: 190 },
  'Falcon2000': { start: 1, end: 100 },
  'Falcon2000EX': { start: 1, end: 5 },
  'Falcon 2000EX EASy': { start: 28, end: 217 },
  'Falcon 2000DX': { start: 601, end: 700 },
  'Falcon 2000LX': { start: 218, end: 262 },
  'Falcon 2000LXS': { start: 263, end: 273 },
  'Falcon 2000S': { start: 701, end: 801 },
  'Falcon7X': { start: 1, end: 400 },
  'Falcon8X': { start: 401, end: 501 },
  'Falcon900EX': { start: 1, end: 100 },
  'Falcon900EZ': { start: 97, end: 197 },
  'Falcon900LX': { start: 601, end: 701 },
  'Falcon900DX': { start: 601, end: 701 },
  'Falcon50': { start: 1, end: 250 },
  'Falcon50EX': { start: 253, end: 352 },
  'Falcon900': { start: 2, end: 102 },
  'Challenger300': { start: 20002, end: 20500 },
  'Challenger350': { start: 20501, end: 20601 },
  'GlobalExpress': { start: 9002, end: 9102 },
  'GlobalExpressXRS': { start: 9159, end: 9259 },
  'Global6000': { start: 9432, end: 9532 },
  'Global6500': { start: 60001, end: 60101 },
  'Global5000': { start: 9127, end: 9227 },
  'Global5000GVFD': { start: 9445, end: 9545 },
  'Global5500': { start: 60001, end: 60101 },
  'Global7500': { start: 70005, end: 70105 },
  'Challenger600': { start: 1004, end: 1085 },
  'Challenger601': { start: 3001, end: 3066 },
  'Challenger601-3A': { start: 5001, end: 5134 },
  'Challenger601-3R': { start: 5135, end: 5194 },
  'Challenger604': { start: 5301, end: 5664 },
  'Challenger605': { start: 5701, end: 5988 },
  'Challenger650': { start: 6050, end: 6999 },
  'Phenom300': { start: 50500004, end: 50500104 },
  'Phenom100': { start: 50000005, end: 50000105 },
  'Phenom100E': { start: 50000005, end: 50000105 },
  'Phenom300E': { start: 50500004, end: 50500104 },
  'Legacy450': { start: 55010003, end: 55019999 },
  'Legacy500': { start: 55000001, end: 55009999 },
  'Hawker1000': { start: 259043, end: 259052 },
  'Hawker1000A': { start: 259004, end: 259042 },
  'Hawker1000B': { start: 259004, end: 259042 },
  'Hawker800': { start: 258255, end: 258843 },
  'Hawker800A': { start: 258001, end: 258254 },
  'Hawker800B': { start: 258001, end: 258254 },
  'Hawker800XP': { start: 258266, end: 258847 },
  'Hawker850XP': { start: 258789, end: 258984 },
  'Hawker900XP': { start: 1, end: 213 },
  'Hawker750': { start: 1, end: 74 },
};

const AircraftForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aircraft');
  const [availableTabs, setAvailableTabs] = useState([]);
  const [engineNum, setEngineNum] = useState(1); // Initialize engineNum

  // State hooks for each form field
  const [tailNumber, setTailNumber] = useState('');
  const [aircraftManufacturer, setAircraftManufacturer] = useState('');
  const [aircraftType, setAircraftType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [dateOfManufacture, setDateOfManufacture] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [asOfDate, setAsOfDate] = useState('');
  const [acTime, setAcTime] = useState('');
  const [acCycle, setAcCycle] = useState('');
  const [foreignRegistered, setForeignRegistered] = useState('');
  const [availableAircraftTypes, setAvailableAircraftTypes] = useState([]);
  const [availableSerialNumbers, setAvailableSerialNumbers] = useState([]);
  const [airframeLogBooks, setAirframeLogBooks] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');

  // Update the aircraft types when the manufacturer changes
  const handleManufacturerChange = (e) => {
    const manufacturer = e.target.value;
    setAircraftManufacturer(manufacturer);
    const types = aircraftOptions[manufacturer] || [];
    setAvailableAircraftTypes(types);
    setAircraftType(''); // Reset the aircraft type selection
  };

  const handleAircraftTypeChange = (e) => {
    const type = e.target.value;
    setAircraftType(type);

    // Look up the serial number range for the selected type
    const range = serialNumberRanges[type];
    const serials = range ? generateSerialNumbers(range.start, range.end) : [];
    setAvailableSerialNumbers(serials);
    setSerialNumber(''); // Reset the serial number selection

    // Update the available tabs and potentially the active tab
    const tabsForType = typeTabs[type] || [];
    setAvailableTabs(tabsForType); // Update available tabs
    if (!tabsForType.includes(activeTab)) {
      setActiveTab(tabsForType[0]?.toLowerCase().replace(/ #|\s+/g, '')); // Update active tab if necessary
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get userId from session
    const userID = sessionStorage.getItem('userID');
    if (!userID) {
      setError('User ID is missing. Please register or log in.');
      return;
    }

    // Create a FormData object to programmatically build our form data
    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('tailNumber', tailNumber);
    formData.append('aircraftManufacturer', aircraftManufacturer);
    formData.append('aircraftType', aircraftType);
    formData.append('serialNumber', serialNumber);
    formData.append('dateOfManufacture', dateOfManufacture);
    formData.append('serviceDate', serviceDate);
    formData.append('asOfDate', asOfDate);
    formData.append('acTime', acTime);
    formData.append('acCycle', acCycle);
    formData.append('foreignRegistered', foreignRegistered);

    // Append the file. Assuming 'pdfFile' is the file we want to upload
    if (pdfFile) {
      formData.append('pdf', pdfFile);
    }

    try {
      const response = await fetch('http://localhost:3001/api/addAircraftForm', {
        method: 'POST',
        body: formData, // FormData object will be properly sent as multipart/form-data
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert("Aircraft successfully registered, move to engine registration");
      const MMS = data.MMS;
      sessionStorage.setItem('MMS', MMS);
      setActiveTab('engine1'); // Move to the first engine tab after successful submission
      setEngineNum(1); // Reset engineNum to 1
    } catch (error) {
      console.error('Error during the fetch operation:', error.message);
    }
  };

  const handleManufactureDateChange = (e) => {
    const newManufactureDate = e.target.value;
    setDateOfManufacture(newManufactureDate);
    if (serviceDate && newManufactureDate > serviceDate) {
      setServiceDate('');
    }
  };

  const handleNext = () => {
    const currentIndex = availableTabs.findIndex(tab => tab.toLowerCase().replace(/ #|\s+/g, '') === activeTab);
    const nextTab = availableTabs[currentIndex + 1];
    if (nextTab) {
      if (nextTab.toLowerCase().includes('engine')) {
        setEngineNum(prev => prev + 1); // Increment engineNum if next tab is an engine
      }
      setActiveTab(nextTab.toLowerCase().replace(/ #|\s+/g, ''));
    } else {
      navigate('/dashboard');
    }
  };

  const isApu = activeTab === 'apu';

  return (
    <div className="aircraft-form-container">
      <div className="tabs">
        {availableTabs.map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName.toLowerCase().replace(/ #|\s+/g, ''))}
            className={`tab-button ${activeTab === tabName.toLowerCase().replace(/ #|\s+/g, '') ? 'active' : ''}`}
          >
            {tabName}
          </button>
        ))}
      </div>

      {activeTab === 'aircraft' ? (
        <div className="aircraft-form">
          <h2>Let's get some of the basic info about your aircraft</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Aircraft Tail#
              <input
                type="text"
                value={tailNumber}
                onChange={(e) => setTailNumber(e.target.value)}
              />
            </label>

            <label>
              Aircraft Manufacturer
              <select
                value={aircraftManufacturer}
                onChange={handleManufacturerChange}
              >
                <option value="">Select Manufacturer</option>
                <option value="Cessna">Cessna</option>
                <option value="Gulfstream">Gulfstream</option>
                <option value="Dassualt">Dassualt</option>
                <option value="Bombardier">Bombardier</option>
                <option value="Embrear">Embrear</option>
                <option value="Hawker">Hawker</option>
              </select>
            </label>

            <label>
              Aircraft Type
              <select
                value={aircraftType}
                onChange={handleAircraftTypeChange}
                disabled={!aircraftManufacturer}
              >
                <option value="">Select Type</option>
                {availableAircraftTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>

            <label>
              Aircraft SN
              <select
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                disabled={!aircraftType}
              >
                <option value="">Select Serial Number</option>
                {availableSerialNumbers.map(sn => (
                  <option key={sn} value={sn}>{sn}</option>
                ))}
              </select>
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
              Entry into Service Date
              <input
                type="date"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                min={dateOfManufacture}
              />
            </label>

            <h2>Enter most current date for which accurate Aircraft times/cycles are known</h2>

            <label>
              As of Date
              <input
                type="date"
                value={asOfDate}
                onChange={(e) => setAsOfDate(e.target.value)}
                min={dateOfManufacture}
              />
            </label>

            <label>
              Aircraft Time
              <input
                type="text"
                value={acTime}
                onChange={(e) => setAcTime(e.target.value)}
              />
            </label>

            <label>
              Aircraft Cycle
              <input
                type="text"
                value={acCycle}
                onChange={(e) => setAcCycle(e.target.value)}
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
              <p>Has the aircraft ever been foreign registered?</p>
              <label>
                <input
                  type="radio"
                  name="foreignRegistered"
                  value="Yes"
                  checked={foreignRegistered === 'Yes'}
                  onChange={(e) => setForeignRegistered(e.target.value)}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="foreignRegistered"
                  value="No"
                  checked={foreignRegistered === 'No'}
                  onChange={(e) => setForeignRegistered(e.target.value)}
                />
                No
              </label>

              <label>
                <input
                  type="radio"
                  name="foreignRegistered"
                  value="Unknown"
                  checked={foreignRegistered === 'Unknown'}
                  onChange={(e) => setForeignRegistered(e.target.value)}
                />
                I don't know
              </label>
            </div>

            <button type="submit">Save Aircraft</button>
          </form>
        </div>
      ) : (
        <EngineTab
          engineNum={isApu ? 'APU' : engineNum}
          onNext={handleNext}
          isApu={isApu}
        />
      )}
    </div>
  );
};

export default AircraftForm;