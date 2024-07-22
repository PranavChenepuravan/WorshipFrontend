import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import str from '../Institution/Rating.jpeg'
import axios from 'axios'

export const InstArchaeology = () => {

  const[data,setData]=useState('')
  let id=localStorage.getItem('id')
  let handlefile=(event)=>{
    console.log(event.target.files)
    setData({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }

  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  let handleSubmit=async (event)=>{
    event.preventDefault()
    let formData= new FormData();
    formData.append('institutionId', id);
    formData.append('location', data.location);
    formData.append('community', data.community);
    formData.append('institutionname', data.institutionname);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('date', data.date);
    formData.append('photo', data.photo);
    formData.append('wealthid', data.wealthid);
    formData.append('wealthname', data.wealthname);
    formData.append('type', data.type);
    formData.append('size', data.size);
    formData.append('weight', data.weight);
    formData.append('eraofmanufacture', data.eraofmanufacture);
    formData.append('madein', data.madein);
    formData.append('material', data.material);
    formData.append('antiquevalue', data.antiquevalue);
    formData.append('heritage', data.heritage);
    formData.append('institutiontype', data.institutiontype);

    let response=await axios.post('https://worshipbackend.onrender.com/institution/archaeological',formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    console.log(response);
  }
  
  return (
    <>
    
<div className="overflow-x-auto ">
    <br />
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400">
   <div className='flex'> 
   <Link to='/instlayout/instarchlist'><button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]">List</button></Link>
    
  </div>
  <div className="mb-5">
   <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Type</label>

      <select onChange={handleChange} name="institutiontype" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
        <option value="" disabled>select type</option>
        <option value="temple">Temple</option>
        <option value="church">Church</option>
        <option value="mosque">Mosque</option>
      </select>
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
    <input onChange={handleChange} type="text" name="location" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required /> 
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Community Type</label>
        <select onChange={handleChange} name="community" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
         <option value="" disabled>select community</option>
         <option value="hindu">Hindu</option>
         <option value="islam">Islam</option>
         <option value="christian">Christian</option>
       </select>   
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of Institution</label>
    <input onChange={handleChange} type="text" name="institutionname" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />    
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input onChange={handleChange} type="text" name="phone" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={10} maxLength={11} required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input onChange={handleChange} type="text" name="email" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
    <input onChange={handleChange} type="date" name="date" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo : </label>
     <input onChange={handlefile} type="file" name="photo" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wealth Id</label>
    <input onChange={handleChange} type="text" name="wealthid" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wealth Name</label>
    <input onChange={handleChange} type="text" name="wealthname" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
    <input onChange={handleChange} type="text" name="type" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
    <input onChange={handleChange} type="text" name="size" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
    <input onChange={handleChange} type="text" name="weight" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Era of Manufacture</label>
    <input onChange={handleChange} type="text" name="eraofmanufacture" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Made In</label>
    <input onChange={handleChange} type="text" name="madein" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material</label>
    <input onChange={handleChange} type="text" name="material" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Antique Value</label>
    <input onChange={handleChange} type="text" name="antiquevalue" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heritagel</label>
    <input onChange={handleChange} type="text" name="heritage" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className=' flex items-center gap-[10px] mt-[5%] ml-[39%]'>
  <div><button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[90%]">Send</button></div>
   </div>
</form>
</div>
    </>
  )
}
export default InstArchaeology
