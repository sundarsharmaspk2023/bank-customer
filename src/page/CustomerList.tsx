import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../features/customerSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/customerList.css';

interface FormData {
  id: number;
  fullName: string;
  address: string;
  country: string;
  pincode: string;
}

const CustomerList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { loading, data, check } = useSelector((state: any) => state.customer);



  const [users, setUsers] = useState<FormData[]>([]);

  function callManageBank(){
        navigate('/beneficiaries')
  }


  function callForm(){
    navigate('/customerForm')
  }

  useEffect(() => {
   dispatch(getUserList())
  }, [dispatch]); 

  useEffect(() => {
    setUsers(data);
   }, [data]); 

  return (
    <div className="table-container">
    <h2>User List</h2>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Address</th>
          <th>Country</th>
          <th>Pincode</th>
          <th>
            <button className="add-button" onClick={callForm}>Add New Customer</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.fullName}</td>
            <td>{user.address}</td>
            <td>{user.country}</td>
            <td>{user.pincode}</td>
            <td>
              <button className="action-button" onClick={callManageBank}>Manage Beneficiaries</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default CustomerList;
