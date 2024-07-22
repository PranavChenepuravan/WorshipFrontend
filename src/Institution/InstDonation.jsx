import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

export const InstDonation = () => {

  const[data,setData]=useState('')
  let id=localStorage.getItem('id')
  let handlefile=(event)=>{
    console.log(event.target.files)
    setData({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }


  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
    console.log(data)
  }

  let handleSubmit=async (event)=>{
    event.preventDefault()
    let formData= new FormData();
    formData.append('institutionId', id);
    formData.append('pilgrimid', id);
    formData.append('name', data.name);
    formData.append('place', data.place);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('date', data.date);
    formData.append('time', data.time);
    formData.append('other', data.other);
    formData.append('amount', data.amount);
    formData.append('category', data.category);
    let response=await axios.post('https://worshipbackend.onrender.com/institution/donation',formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    console.log(response);

  }

  return (


    <div className="overflow-x-auto ">
    <br />
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400">
    <Link to='/instlayout/instdonationonlinelist'><button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]">Online List</button></Link>
    <Link to='/instlayout/instdonlist'><button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]">List</button></Link>  
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
      <select onChange={handleChange}  name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
        <option value="" readonly>select category</option>
        <option value="lunchfeed">Lunch Feed</option>
        <option value="charity">Charity</option>
        <option value="festival">Festival</option>
      </select>
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>

       {/* <select name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
         <option value="" disabled>select location</option>
         <option value="">sxsadsa</option>
       </select>    */}
       <input onChange={handleChange} type="text" name='name' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place</label>
        {/* <select name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
         <option value="" disabled>select community</option>
         <option value="">sxsadsa</option>
       </select>    */}
       <input onChange={handleChange} type="text" name='place' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
        {/* <select name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
         <option value="" disabled>select institution</option>
         <option value="">sxsadsa</option>
       </select> */}
       <input pattern="[0-9]{10}" onChange={handleChange} type="text"  name='phone' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" maxLength={10} minLength={10} required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input onChange={handleChange} type="email" name='email' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  {/* <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
    <input onChange={handleChange} type="date" name='date' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div> */}
      <div className="mb-5">
  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
  <input 
    onChange={handleChange} 
    name='date' 
    type="date" 
    id="password" 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" 
    min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
    required 
  />
</div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
    <input onChange={handleChange} type="time" name='time' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Details</label>
    <input onChange={handleChange} type="text" name='other' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
    <input onChange={handleChange} type="text" name='amount' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className=' flex items-center gap-[10px] mt-[5%] ml-[39%]'>
  <div><button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[90%]">Proceed</button></div>
   </div>
</form>
</div>

  )
}
export default InstDonation
