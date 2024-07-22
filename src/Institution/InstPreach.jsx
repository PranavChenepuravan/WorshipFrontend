import React,{useState} from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

export const InstPreach = () => {
  const[data,setData]=useState('')
  let id=localStorage.getItem('id')
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
    let formData= new FormData();
    formData.append('photo', data.photo);
    formData.append('InstitutionIduserid', data.InstitutionId);
    formData.append('classId', data.classId);
    formData.append('preacher', data.preacher);
    formData.append('topic', data.topic);
    formData.append('startingdate', data.startingdate);
    formData.append('endingdate', data.endingdate);
    formData.append('time', data.time);
    formData.append('other', data.other);
    formData.append('institutionId', id);
    
    let response=await axios.post('https://worshipbackend.onrender.com/institution/preach',formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    console.log(response);
  }

  const today = new Date().toISOString().split('T')[0]; // Get today's date in "yyyy-mm-dd" format

  return (
    <div className=''>
   

<form  id='mycomponet' onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400/80">
<Link to='/instlayout/instpreachlist'>
<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">List</button>
</Link>
   <div className='flex'> 
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preacher Name</label>
     <input type="text" name="preacher" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic</label>
     <input type="text" name="topic" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  {/* <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Staring Date</label>
     <input type="date" name="startingdate" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div> */}
  <div className="mb-5 ">
  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting Date : </label>
  <input 
    onChange={handleChange} 
    name='startingdate' 
    type="date" 
    id="password" 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" 
    min={today} // Set min attribute to today's date
    required 
  />
</div>
  {/* <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ending Date</label>
     <input type="date" name="endingdate" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div> */}
    <div className="mb-5">
  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ending Date : </label>
  <input 
    onChange={handleChange} 
    name='endingdate' 
    type="date" 
    id="password" 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" 
    min={data.startingdate || today} // Set min attribute to today's date
    required 
  />
</div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
     <input type="time" name="time" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo : </label>
     <input type="file" name="photo" onChange={handlefile} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />   
  </div>
  <div className="mb-5">
     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other</label>
     <input type="text" name="other" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />   
  </div>
  <div className=' flex items-center gap-[10px] mt-[5%] ml-[39%]'>
    <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cancel</button>
   </div>
</form>
    </div>
  )
}
export default InstPreach
