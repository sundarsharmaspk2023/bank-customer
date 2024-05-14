import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../components/Modal';
import { addBeneficiary, clear } from '../features/customerBeneficiarySlice';
import '../styles/addcustomer.css'
interface FormData {
  id: number;
  name: string;
  account: string;
  bank: string;
  type: string;
}

const CustomerBeneficiaryForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: '',
    account: '',
    bank: '',
    type: '',
  });


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData){
      dispatch(addBeneficiary(formData));
      openModal();
    }
 
  };

 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 

  return (
    <div className="form-container">
      <h2 className="form-title">Add Beneficiary Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="account">Account Number:</label>
          <input
            type="text"
            id="account"
            name="account"
            value={formData.account}
            onChange={handleInputChange}
            required
          />
        </div>
       
        <div>
          <label htmlFor="bank">Bank Name:</label>
          <input
            type="text"
            id="bank"
            name="bank"
            value={formData.bank}
            onChange={handleInputChange}
            required
          />
        </div>


        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Beneficiary</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Add new Beneficiary</h2>
        <p>Added new beneficiary successfully.</p>
        <button onClick={closeModal}>Ok</button>
      </Modal>
    </div>
  );
};

export default CustomerBeneficiaryForm;
