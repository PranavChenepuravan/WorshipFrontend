import React, { useEffect, useState } from 'react';
import boy from '../Pilgrim/Boy.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PilgChangePassword = () => {
  let id = localStorage.getItem('id');
  const [userData, setUserData] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchdata();
  }, [refresh]);

  const [data, setData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (data.newPassword === data.confirmPassword) {
        // New password and confirm password match
        const newData = { password: data.newPassword };
        const response = await axios.put(`https://worshipbackend.onrender.com/pilgrim/editprofile/${id}`, newData);
        console.log(response);
        setData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setRefresh(!refresh);
      } else {
        // New password and confirm password don't match
        console.error('New password and confirm password do not match');
        // Optionally, you can show an error message to the user
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handlePasswordClick = () => {
    if (data.newPassword === data.confirmPassword) {
      setData({ ...data, confirmPassword: data.newPassword });
    } else {
      console.error('New password and confirm password do not match');
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-slate-400/80 p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex items-center space-x-2 mb-6">
              <h1 className="text-xl font-semibold">Change Password</h1>
            </div>
            <p className="text-sm text-black mb-6">Update password for enhanced account security.</p>
            <form id="changePasswordForm" className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 block mb-2">
                  Current Password *
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
                  value={data.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 block mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
                  value={data.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div id="passwordCriteria" className="text-sm space-y-2">
                <p className="text-yellow-300">Weak password. Must contain:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>At least 1 uppercase</li>
                  <li>At least 1 number</li>
                  <li>At least 8 characters</li>
                </ul>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePasswordClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Set Confirm Password
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </form>
    </>
  );
};

export default PilgChangePassword;
