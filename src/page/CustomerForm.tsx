import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, clear, getUserList } from '../features/customerSlice';
import Modal from '../components/Modal';
import '../styles/addcustomer.css'

interface FormData {
  id: number;
  fullName: string;
  address: string;
  country: string;
  pincode: string;
}

const CustomerForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, data, check } = useSelector((state: any) => state.customer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    fullName: '',
    address: '',
    country: '',
    pincode: '',
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
      dispatch(addUser(formData));
      openModal();
    }
   
  };


  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clear())
  };


  return (
    <div className="form-container">
      <h2 className="form-title">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="UK">UK</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div>
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Add New User</h2>
        <p>New User added successfully.</p>
        <button onClick={closeModal}>Ok</button>
      </Modal>
    </div>
  );
};

export default CustomerForm;
