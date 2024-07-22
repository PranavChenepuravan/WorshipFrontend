import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const RegIncome = () => {
  const navigate=useNavigate()
  const [data,setData]=useState('')
  let handlefile=(event)=>{
    console.log(event.target.files);
    setData({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }

  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  let handleSubmit=async  (event)=>{
    event.preventDefault()
    try{
    let formData = new FormData();
    formData.append('photo', data.photo);
    formData.append('departmentName', data.departmentName);
    formData.append('location', data.location);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('other', data.other);
    formData.append('idproof', data.idproof);
    formData.append('userType','incometax')
    formData.append('transaction','approved')

    let response=await axios.post('https://worshipbackend.onrender.com/register',formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    console.log(response)
    navigate('/login')
  }
  catch(e){
    console.log(e);
    toast.error( e.response.data.message || e.message)
}
   
  }

  return (
    <>
    <div className='regback h-screen'>
    <ToastContainer/>
    <form  id='mycomponet' onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400/80">
   <div className='flex'> 
   
  </div>


  <div className="mb-5">
   <label for="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department Type</label>

      <select name="departmentName" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
        <option value="" readonly>select type</option>
        <option value="State">State</option>
        <option value="Central">Central</option>
      </select>
  </div>
  <div className="mb-5">
    <label for="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
    <input type="text" name="location" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required /> 
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
    <input type="text" name="other" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
    <input type="phone" name="phone" pattern="[0-9]{10,11}" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={10} maxLength={11} required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" name="email" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
    <input type="file" name="photo" onChange={handlefile} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Liscence : </label>
     <input type="file" name="idproof" onChange={handlefile} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input type="password" name="password" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" required />
  </div>
  <div className=' flex items-center gap-[10px] mt-[5%] ml-48'>
    <Link to="/">
    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cancel</button>
    </Link>
    <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
  </div>
</form>
</div>
    </>
  )
}
export default RegIncome
