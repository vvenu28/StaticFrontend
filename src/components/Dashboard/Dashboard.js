import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import AddLogbookForm from '../AddLogbookForm/AddLogbookForm';
import AddWorkorderForm from '../AddWorkorderForm/AddWorkorderForm';

const LogbookDocumentBox = ({ title, pdfs, isLogbooks, isWorkOrders, onAddPdfClick }) => {
  const [showPDFs, setShowPDFs] = useState(false);

  return (
    <div className="document-box">
      <div className="document-header" onClick={() => setShowPDFs(!showPDFs)}>
        <h3>{title}</h3>
        <button className="toggle-pdfs">{showPDFs ? '-' : '+'}</button>
      </div>
      {showPDFs && (
        <div className="pdf-list">
          {pdfs.map((pdf, index) => (
            <div key={index} className="pdf-link">{pdf}</div> // Placeholder for PDF link
          ))}
          {isLogbooks && (
            <button className="add-pdf-button" onClick={onAddPdfClick}>Add Logbooks</button>
          )}
          {isWorkOrders && (
            <button className="add-pdf-button" onClick={onAddPdfClick}>Add Work Orders</button>
          )}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [isAddPdfModalVisible, setIsAddPdfModalVisible] = useState(false);
  const [addFormType, setAddFormType] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userID = sessionStorage.getItem('userID');
      console.log("UserID:", userID);
      if (!userID) {
        navigate('/login'); // Redirect to login if no userID is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/dashboard`, {
          method: 'POST', // Change method to POST
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID }), // Send userID in the body
        });
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        console.log("Dashboard Data:", data);
        setDashboardData(data);
        setLoading(false); // Update loading state
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message); // Update error state
        setLoading(false); // Update loading state
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.removeItem('userID');
    navigate('/login');
  };

  const handleAddPdf = (formData) => {
    // Process the form data, e.g., send it to a server or add it to the state
    console.log(formData);
    setIsAddPdfModalVisible(false); // Hide the modal after submitting
  };

  const handleAddPdfClick = (type) => {
    setAddFormType(type);
    setIsAddPdfModalVisible(true);
  };

  const goToEditProfile = () => {
    navigate('/edit-profile'); // Navigate to EditProfile page
  };

  const handleCancel = () => {
    setIsAddPdfModalVisible(false); // Hide the modal when cancel is clicked
  };

  const documents = [
    { id: 1, title: 'LOGBOOKS', pdfs: ['AF1.pdf', 'ENG1.pdf', 'ENG2.pdf', 'APU.pdf'] },
    { id: 2, title: 'WORK ORDERS', pdfs: ['WO 12584.pdf', 'WO 45788.pdf'] },
    { id: 3, title: 'MODS', pdfs: ['ADS.pdf', 'SB.pdf', 'VOR.pdf'] }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  console.log("Dashboard Data:", dashboardData);

  const { aircraft, engines, recentEvents, inspectionRequirements, reports } = dashboardData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776; {/* This is a common character used to represent a menu; you can also use an image or an icon */}
        </div>
      </div>

      {showMenu && (
        <div className="menu-content">
          <div onClick={goToEditProfile}>Edit Profile</div> {/* Navigate to Edit Profile on click */}
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}

      <div className="top-section">
        <div className="aircraft-info-card">
          <h2>Aircraft</h2>
          <p>Model: {aircraft.model}</p>
          <p>SN: {aircraft.serialNumber}</p>
          <p>Hours: {aircraft.aircraftTime}</p>
          <p>Cycles: {aircraft.aircraftCycle}</p>
        </div>
        <div className="engine-info-section">
          {Object.keys(engines).map(engineNum => (
            <div key={engineNum} className="engine-info-card">
              <h2>Engine {engineNum}</h2>
              <p>Type: {engines[engineNum].Engine_Type}</p>
              <p>SN: {engines[engineNum].Engine_SN}</p>
              <p>Hours: {engines[engineNum].Engine_Time}</p>
              <p>Cycles: {engines[engineNum].Engine_Cycle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-section">
        <div className="left-section">
          <RecentEventsBox recentEvents={recentEvents} />
          <InspectionRequirementsBox inspectionRequirements={inspectionRequirements} />
          <Reports reports={reports} />
        </div>
      </div>

      {/* Documents Section */}
      <div className="documents-section">
        {documents.map(doc => (
          <LogbookDocumentBox
            key={doc.id}
            title={doc.title}
            pdfs={doc.pdfs}
            isLogbooks={doc.title === 'LOGBOOKS'}
            isWorkOrders={doc.title === 'WORK ORDERS'}
            onAddPdfClick={() => handleAddPdfClick(doc.title)}
          />
        ))}
      </div>

      {isAddPdfModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {addFormType === 'LOGBOOKS' && <AddLogbookForm onSubmit={handleAddPdf} onCancel={handleCancel} />}
            {addFormType === 'WORK ORDERS' && <AddWorkorderForm onSubmit={handleAddPdf} onCancel={handleCancel} />}
          </div>
        </div>
      )}
    </div>
  );
};

const RecentEventsBox = ({ recentEvents }) => {
  return (
    <div className="recent-events-box">
      <h3>RECENT EVENTS</h3>
      <div className="event-header">
        <div style={{ display: 'table', width: '100%' }}>
          {recentEvents.map((event, index) => (
            <div key={index} className="event">
              <div>{event.date}</div>
              <div>{event.tt}</div>
              <div>{event.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InspectionRequirementsBox = ({ inspectionRequirements }) => {
  return (
    <div className="inspection-requirements-box">
      <h3>INSP REQ</h3>
      <div className="requirement-header">
        <div style={{ display: 'table', width: '100%' }}>
          {inspectionRequirements.map((req, index) => (
            <div key={index} className="requirement">
              <div>{req.inspection_comp}</div>
              <div>{req.type}</div>
              <div>{req.revision}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Reports = ({ reports }) => {
  return (
    <div className="reports-box">
      <h3>Reports</h3>
      <div className="requirement-header">
        <div style={{ display: 'table', width: '100%' }}>
          {reports.map((req, index) => (
            <div key={index} className="requirement">
              <div>{req.report_comp}</div>
              <div>{req.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
