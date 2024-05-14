import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clear, deleteBeneficiary, getBeneficiaryList } from '../features/customerBeneficiarySlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import '../styles/beneficiaryList.css'; // Import the CSS file for styling

interface FormData {
  id: number;
  name: string;
  account: string;
  bank: string;
  type: string;
}

const CustomerBeneficiaryList: React.FC = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { loading, data, check } = useSelector((state: any) => state.beneficiary);



  const [formData, setForm] = useState<FormData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function callManageBank(){
        navigate('/beneficiariesForm')
  }

  function editManageBank(user: any){
    navigate('/editBeneficiaries', { state: { user } });

  }




  function viewManageBank(user: any){
    navigate('/viewBeneficiaries', { state: { user } });
  }

  useEffect(() => {

   dispatch(getBeneficiaryList())

  }, [dispatch]); 

 

  const handleDeleteUser = (beneficiaryId: number) => {
  
    if (formData) {
      dispatch(deleteBeneficiary(beneficiaryId));
      openModal();
    }
  };



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setForm(data);
   }, [data]); 


  

  return (
    <div className="table-container">
      <h2>Customer Beneficiary List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>Bank Name</th>
            <th>Type</th>
            <th><button  className="add-button" onClick={callManageBank}>Add New Beneficiary</button></th>
          </tr>
        </thead>
        <tbody>
          {formData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.account}</td>
              <td>{user.bank}</td>
              <td>{user.type}</td>
              <td>
                <button className="action-button" onClick={() =>viewManageBank(user)}>View Beneficiary</button>
                <button className="action-button" onClick={() => editManageBank(user)}>Edit Beneficiary</button>
                <button className="action-button" onClick={() =>handleDeleteUser(user.id)}>Delete Beneficiary</button>
              </td>
              {/* <td>
              
              </td>
              <td>
               
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Confirmation</h2>
        <p>Are you sure. you want to delete.</p>
        <button onClick={closeModal}>Ok</button>
      </Modal>

    </div>
  );
};

export default CustomerBeneficiaryList;
