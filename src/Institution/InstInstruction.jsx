import React,{ useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export const InstInstruction = () => {
  const [data,setData]=useState('')
  let id = localStorage.getItem('id')
  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value,institutionId:id})
  }

  let handleSubmit= (event)=>{
    event.preventDefault()

    let response=axios.post('https://worshipbackend.onrender.com/institution/instruction',data)
    console.log(response);
    window.location.reload();
  }
  return (
    <>
    {/* <div className='rectinstr '> */}
    <div className=' h-[50%] w-[50%]  justify-center '>

    <Link to='/instlayout/instinstructionlist'>
    <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]">List</button>
    </Link>
     <div className='text-[150%] text-center'>INSTRUCTIONS</div>
     <textarea type="text" name="instruction" onChange={handleChange} id="first_name" className="h-[75%]  ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required />
     <button type="button" onClick={handleSubmit} className="focus:outline-none ml-[43%] mr-[50%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
    
    </div> 
    </>
  )
}
export default InstInstruction
