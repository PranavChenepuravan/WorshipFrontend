import React, { useEffect, useState } from 'react';
import boy from '../Pilgrim/Boy.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PilgProfile = () => {
  let id = localStorage.getItem('id');
  const [userData, setUserData] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  },[refresh]);


  let handleSubmit=async (event)=>{
    event.preventDefault();
    try {
      await axios.put(`https://worshipbackend.onrender.com/terminate/${id}`);
      setUserData('');
      setRefresh(!refresh);
      navigate('/')
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handlePageClick = ({ selected }) => {
    setshowWarning(true);
  };

  return (
    <>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white/90 shadow-xl rounded-lg text-gray-900 relative">

        <div className="rounded-t-lg h-32 overflow-hidden">
       
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <div>
            <img src={`https://worshipbackend.onrender.com/uploads/${userData.photo}`} alt="" className="object-cover object-center h-32" />
          </div>
          
        </div>

        <div className="flex flex-col pl-[15%] text-xl">
          <div className="flex">
            <div>Name : </div>
            <h2>{userData.name}</h2>
          </div>
          <div className="flex">
            <div>Place : </div>
            <h2>{userData.location}</h2>
          </div>
          <div className="flex">
            <div>Phone : </div>
            <h2>{userData.phone}</h2>
          </div>
          <div className="flex">
            <div>Email : </div>
            <h2>{userData.email}</h2>
          </div>
          <div className="flex flex-col">
            <div className='underline'>Address  </div>
            <h2>{userData.other}</h2>
          </div>
          <div>
            <li className="text-white"> </li>
            <div className="flex">
            <Link to="/pilglayout/pilgprofileedit">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36 "
              >
                Edit
              </button>
              </Link>
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36 "
                onClick={handlePageClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>




      {showWarning && (
  <div className='bg-white absolute flex flex-col w-96 h-32 ml-96 -mt-28'>
    <div className='pt-5 pl-2'>
     <p>Are you sure</p>
    </div>
    <div className='flex pt-9 pl-48 '>
       <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-20" onClick={()=>setshowWarning(false)}>Cancel</button>
       <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-20" onClick={handleSubmit}>Ok</button>
    </div>

  </div>
)}








    </>
  );
};

export default PilgProfile;