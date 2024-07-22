import React, { useEffect, useState } from 'react'
import boy from '../Pilgrim/Boy.jpg'
import { Link, useNavigate } from 'react-router-dom' 
import axios from 'axios'

export const InstProfile = () => {
  let id=localStorage.getItem('id')
  const [userData,setUserData]=useState('')
  const [refresh,setrefresh]=useState(false)
  const navigate=useNavigate()
  const [showWarning, setshowWarning] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  useEffect(()=>{
    let fetchdata=async ()=>{
      let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`)
      console.log(response.data);
      setUserData(response.data)
    }
    fetchdata()
  },[refresh])


  let handleSubmit=async (event)=>{
    event.preventDefault();
    try {
      await axios.put(`https://worshipbackend.onrender.com/terminate/${id}`);
      setUserData('');
      setrefresh(!refresh);
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
      <div
    class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white/90 shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden">
        {/* <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'> */}
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <div><img src={`https://worshipbackend.onrender.com/uploads/${userData.photo}`} alt="" className='object-cover object-center h-32' /></div>
        {/* <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front'> */}
    </div>
    {/* <div class="text-center mt-2">
        <h2 class="font-semibold">John Smith</h2>
        <p class="text-gray-500">Freelance Web Designer</p>
    </div> */}
    <div className='flex flex-col pl-[15%] text-xl pt-2'>
    <Link to='/instlayout/instproperties'><button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-72">Properties</button></Link>

      <div className='flex'> 
        <div>Name : </div>
        <h2>{userData.institutionName}</h2>
      </div>
      <div className='flex'> 
        <div>Religion : </div>
        <h2>{userData.community}</h2>
      </div>
      <div className='flex'> 
        <div>Place : </div>
        <h2>{userData.location}</h2>
      </div>
      <div className='flex'> 
        <div>Phone : </div>
        <h2>{userData.phone}</h2>
      </div>
      <div className='flex'> 
        <div>Email : </div>
        <h2>{userData.email}</h2>
      </div>
      <div className='flex flex-col'> 
        <div className='underline'>Address  </div>
        <h2>{userData.other}</h2>
      </div>
      <div>
        <li className='text-white'> </li>
        <div className='flex'>
           <Link to='/instlayout/instprofileedit'><button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36 ">Edit</button></Link>
           <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36 " onClick={handlePageClick}>Delete</button>
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
  )
}
export default InstProfile
