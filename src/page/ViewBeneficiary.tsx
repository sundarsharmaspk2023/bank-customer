import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/viewbeneficiary.css'

const ViewBeneficiary: React.FC = () => {
  const { state } = useLocation();

  if (!state || !state.user) {
    return <div>No row data found</div>;
  }

  const { name, account, bank, type } = state.user;

  return (
    <div className="container"> {/* Apply CSS class for centering */}
    <h2>Beneficiary Details Page</h2>
    <p>Name: {name}</p>
    <p>Account Number: {account}</p>
    <p>Bank Name: {bank}</p>
    <p>Type: {type}</p>
  </div>
  );
};

export default ViewBeneficiary;
