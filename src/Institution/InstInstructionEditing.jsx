import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const InstInstructionEditing = () => {
  const { instrId } = useParams();
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://worshipbackend.onrender.com/institution/instructionedit/${instrId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [instrId, refresh]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
       axios.put(`https://worshipbackend.onrender.com/institution/instructionedit/${instrId}`, data);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  return (
    <div className='h-[50%] w-[50%] justify-center'>
      <div className='text-[150%] text-center'>INSTRUCTIONS</div>
      <textarea
        onChange={handleChange}
        value={data.instruction || ''}
        name="instruction"
        id="first_name"
        className="h-[75%] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      <button onClick={handleSubmit} type="submit" className="focus:outline-none ml-[43%] mr-[50%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
    </div>
  );
};

export default InstInstructionEditing;
