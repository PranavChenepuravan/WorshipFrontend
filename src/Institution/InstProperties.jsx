import React,{ useEffect ,useState } from 'react'
import boy from '../Pilgrim/Boy.jpg'
import { Link } from 'react-router-dom' 
import axios from 'axios'

export const InstProperties = () => {
  let id=localStorage.getItem('id')
  const [userData,setUserData]=useState('')
  const [refresh,setrefresh]=useState(false)


  const[data,setData]=useState('')
  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value,institutionId:id})
    console.log(data);
  }

  let handleSubmit=async(event)=>{
    event.preventDefault()
    setrefresh(!refresh)
    let response=await axios.post('https://worshipbackend.onrender.com/institution/propertieinst',data)
    console.log(response);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>

    <div class="mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">

    <div className='flex flex-col pl-[5%] pr-[5%] text-xl'>
        <div className='flex pt-8'> 
            <label htmlFor="property1" className="w-[20%]">Property 1 :</label>
            <input type="text" onChange={handleChange} name="property1" id="property1" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="income1" className="w-[20%]">Property 1 Income :</label>
            <input type="text" onChange={handleChange} name="income1" id="income1" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="property2" className="w-[20%]">Property 2 :</label>
            <input type="text" onChange={handleChange} name="property2" id="property2" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="income2" className="w-[20%]">Property 2 Income :</label>
            <input type="text" onChange={handleChange} name="income2" id="income2" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="property3" className="w-[20%]">Property 3 :</label>
            <input type="text" onChange={handleChange} name="property3" id="property3" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="income3" className="w-[20%]">Property 3 Income :</label>
            <input type="text" onChange={handleChange} name="income3" id="income3" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="property4" className="w-[20%]">Property 4 :</label>
            <input type="text" onChange={handleChange} name="property4" id="property4" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className='flex pt-8'> 
            <label htmlFor="income4" className="w-[20%]">Property 4 Income :</label>
            <input type="text" onChange={handleChange} name="income4" id="income4" className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    </div>
    <div className='pl-[30%] flex'>
        <li className='text-white'> </li>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 w-[53%]">Cancel</button>
        <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 w-[53%]">Save</button>
    </div>
</div>



    </form>
      
    </>
  )
}
export default InstProperties
