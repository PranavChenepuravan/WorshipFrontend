import React,{useState} from 'react'
import './App.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const RegPilgrim = () => {
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

let handleSubmit=async (event)=>{
    event.preventDefault()
    try{

      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('idproof', data.idproof);
      formData.append('password', data.password);
      formData.append('email',data.email);
      formData.append('location',data.location);
      formData.append('phone',data.phone);
      formData.append('other',data.other);
      formData.append('photo',data.photo);
      formData.append('userid',data.userid);
      formData.append('gender',data.gender);
      formData.append('userType','pilgrim');
      formData.append('status','approved')
      formData.append('transaction','approved')
      
      let response=await axios.post('https://worshipbackend.onrender.com/register',formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
        
      })
      navigate('/login')
    }catch(e){
      console.log(e);
      toast.error( e.response.data.message || e.message)
    }
    }
    return (
    <>
    <ToastContainer/>
    <div className='regback h-screen'>
    <form  id='mycomponet' onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400/80">
   <div className='flex'> 
   
  </div>

  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" id="password" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className='mb-5'>
            <label htmlFor='gender' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Gender
            </label>
            <div className='flex items-center'>
              <input
                type='radio'
                id='male'
                name='gender'
                value='male'
                onChange={handleChange}
                className='mr-2'
                required
              />
              <label htmlFor='male' className='mr-4'>
                Male
              </label>
              <input
                type='radio'
                id='female'
                name='gender'
                value='female'
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor='female' className='mr-4'>
                Female
              </label>
              <input
                type='radio'
                id='other'
                name='gender'
                value='other'
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor='other'>Other</label>
            </div>
          </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
       <input type="text" id="password" name="location" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required /> 
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
    <input type="text" onChange={handleChange} name="other" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input type="phone" onChange={handleChange} pattern="[0-9]{10}" name="phone" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={10} maxLength={10} required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" onChange={handleChange} name="email" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
    <input type="file" id="password" name="photo" onChange={handlefile} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id Proof</label>
    <input type="file" id="password" name="idproof" onChange={handlefile} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input type="password" name="password" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" required />
  </div>
  <div className=' flex items-center gap-[10px] mt-[5%] ml-48'>
    <Link to="/">
    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cancel</button>
    </Link>
    <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
   </div>
  </form>
  </div>
    </>
  )
}
export default RegPilgrim
