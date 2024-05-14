import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { updateBeneficiary } from '../features/customerBeneficiarySlice';
import '../styles/addcustomer.css'

interface FormData {
  id: number;
  name: string;
  account: string;
  bank: string;
  type: string;
}

const EditBeneficiary: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data } = useSelector((state: any) => state.beneficiary);


  const { state } = useLocation();
  const { id } = state.user;

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: '',
    account: '',
    bank: '',
    type: '',
  });

  useEffect(() => {
    const userToUpdate = data.find((data: { id: any; }) => data.id === id);
    if (userToUpdate) {
      setFormData(userToUpdate);
    }
  }, [data, id]);



  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (formData) {
      dispatch(updateBeneficiary(formData));
      openModal();
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
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
      <h2 className="form-title">Update Beneficiary Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
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
          <label htmlFor="account">Account Number: </label>
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
        <button type="submit">Update</button>

      </form>


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Update Beneficiary</h2>
        <p>Updated beneficiary successfully.</p>
        <button onClick={closeModal}>Ok</button>
      </Modal>
    </div>
  );
};

export default EditBeneficiary;
