import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const PilgInstitutionHeritage = () => {

  let {id} = useParams()
  const [data,setData]=useState([''])
  const [data1,setData1]=useState([''])
  const [refresh,setrefresh]=useState('')

  useEffect(()=> {
    let fetchdata=async ()=>{
      
      let resopone=await axios.get(`https://worshipbackend.onrender.com/institution/archheritage/${id}`)
      console.log(resopone.data);
      setData(resopone.data)

      let resopone1=await axios.get(`https://worshipbackend.onrender.com/institution/instruction/${id}`)
      console.log(resopone1.data)
      setData1(resopone1.data)
    }
    fetchdata()
  },[refresh])
  return (
    <>
      <div className='flex'>
      <div className=' h-[50%] w-[50%]  justify-center '>
        <div className='text-[150%] text-center text-white'>HERITAGE</div>
        {data.map((item,index)=>(
          <textarea type="text" name="heritage" value={item?.heritage}  id="first_name" className="h-[45%]  ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required />
        ))} 
        </div> 
        

    
        <div className=' h-[50%] w-[50%]  justify-center '>
        <div className='text-[150%] text-center text-white'>INSTRUCTIONS</div>
        {data1.map((item,index)=>(
          <textarea type="text" name="heritage" value={item?.instruction}  id="first_name" className="h-[20%]  ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required />
        ))}
        </div> 

      </div>
    </>
  )
}
export default PilgInstitutionHeritage
