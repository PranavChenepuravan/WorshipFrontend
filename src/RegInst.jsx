import React,{useState} from 'react'

import './App.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const RegInst = () => {
  const navigate=useNavigate()
  const[data,setData]=useState('')

  const[prodata,setProdata]=useState('')

  let handlefile=(event)=>{
    console.log(event.target.files);
    setData({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }


let handleChange=(event)=>{
  setData({...data,[event.target.name]:event.target.value})
  setProdata({...data,[event.target.name]:event.target.value})
}

  let handleSubmit=async (event)=>{
    event.preventDefault()
    try{

    let formData= new FormData();
    formData.append('photo', data.photo);
    formData.append('idproof', data.idproof);
    formData.append('userid', data.userid);
    formData.append('insttype', data.insttype);
    formData.append('location', data.location);
    formData.append('community', data.community);
    formData.append('institutionName', data.institutionName);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('other', data.other);
    formData.append('otherauthorityname', data.otherauthorityname);
    formData.append('otherauthorityid', data.otherauthorityid);
    formData.append('caretaker', data.caretaker);
    formData.append('userType','institution');
    
    let response=await axios.post('https://worshipbackend.onrender.com/register',formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    navigate('/login')
  }
    catch(e){
      console.log(e);
      toast.error( e.response.data.message || e.message)
  }
  }

  let handleAnotherSubmit=async (event)=>{
    event.preventDefault()

    let response1=await axios.post('https://worshipbackend.onrender.com/Common/properties',data)
    console.log(response1);
    
  }




  const [menu,setMenu]=useState(true)

  const toggle=()=>{
    setMenu(!menu)
 }

  return (
    <div className='regback'>

  
<ToastContainer/>
<div className='pt-2'>
<form  id='mycomponet' onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400/80">
   <div className='flex'> 
  </div>

  <div className="mb-5">
   <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Type</label>

      <select name="insttype" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
        <option value="" readonly>select type</option>
        <option value="temple">Temple</option>
        <option value="mosque">Mosque</option>
        <option value="church">Church</option>
      </select>
  </div>
  {/* <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Authority Name</label>
       <input type="text" name="otherauthorityname" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required /> 
  </div> */}
      <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authority Name</label>
        <select name="otherauthorityname" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
         <option value="" readonly>select community</option>
         <option value="Devaswam">Devaswam</option>
         <option value="Roopatah">Roopatha</option>
         <option value="Waqf">Waqf</option>
       </select>   
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authority Id</label>
       <input type="text" name="otherauthorityid" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required /> 
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of Institution</label>
     <input type="text" name="institutionName" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
       <input type="text" name="location" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required /> 
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
    <input type="text" name="other" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />
  </div>

  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Religion</label>
        <select name="community" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
         <option value="" readonly>select Religion</option>
         <option value="hindu">Hindu</option>
         <option value="islam">Islam</option>
         <option value="christian">Christian</option>
       </select>   
  </div>

  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo : </label>
     <input type="file" name="photo" onChange={handlefile} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proof : </label>
     <input type="file" name="idproof" onChange={handlefile} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Care Taker Address : </label>
    <input type="text" name="caretaker"  onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No: </label>
    <input type="text" name="phone" pattern="[0-9]{10,11}" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={10} maxLength={11} required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" name="email" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
  <input type="password" name="password" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" required />
</div>

  <div className=' flex items-center gap-[10px] mt-[5%] ml-48'>
    <Link to="/">
    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cancel</button>
    </Link>
    <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
   </div>
</form>
</div>


    </div>
  )
}
export default RegInst