import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios'

export const InstFestivalEvents = () => {

  const[data,setData]=useState([''])
  // const [userData,setUserData]=useState('') 
  // const [festivals,setFestivals]=useState([''])
  const [festivalData,setFesivalData]=useState('')
  const [refresh,setrefresh]=useState(false)
  let {id}=useParams()


  // useEffect(()=>{
  //   let fetchdata=async ()=>{
  //     let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewfestforevent/${id}`)
  //     console.log(response.data);
  //     setFesivalData(response.data)
  //   }
  //   fetchdata()
  // },[refresh])

  let handlefile=(event)=>{
    console.log(event.target.files);
    setData({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }

  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  let handeleSubmit=async (event)=>{
    event.preventDefault()
    let formData= new FormData();
    formData.append('eventname', data.eventname);
    formData.append('photo', data.photo);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('starttime', data.starttime);
    formData.append('endtime', data.endtime);
    formData.append('festivalId',id)
    

    let response=await axios.post('https://worshipbackend.onrender.com/institution/festevents',formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })
    console.log(response);
  }

  return (
    <>
     <form onSubmit={handeleSubmit} className="max-w-sm mx-auto bg-gray-400">
     <Link to={`/instlayout/instfestivaleventslist/${id}`}>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]">List</button>
     </Link>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
        <input onChange={handleChange} name='eventname' type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
        <input name='photo' onChange={handlefile} type="file" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <input onChange={handleChange} name='description' type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
        <input onChange={handleChange} name='date' type="date" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting Time</label>
        <input onChange={handleChange} name='starttime' type="time" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ending Time</label>
        <input onChange={handleChange} name='endtime' type="time" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
      </div>
      <div className=' flex items-center gap-[10px] mt-[5%] ml-[39%]'>
        <div><button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[90%]">Submit</button></div>
      </div>
     </form>
    </>
  )
}
export default InstFestivalEvents
