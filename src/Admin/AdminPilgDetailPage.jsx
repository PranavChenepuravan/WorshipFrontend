import React,{ useEffect ,useState } from 'react'
import boy from '../Pilgrim/Boy.jpg'
import { Link, useParams } from 'react-router-dom' 
import axios from 'axios'

export const AdminPilgDetailPage = () => {
  let {id}=useParams()
  const [userData,setUserData]=useState('')
  const [refresh,setrefresh]=useState(false)

  useEffect(()=>{
    let fetchdata=async ()=>{
      let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`)
      console.log(response.data);
      setUserData(response.data)
    }
    fetchdata()
  },[refresh])

  const[data,setData]=useState('')
  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
    console.log(data);
  }

  let handleSubmit=async(statuss)=>{
    setrefresh(!refresh)
    let response=await axios.put(`https://worshipbackend.onrender.com/admin/manageUser/${id}`,{status:statuss})
    console.log(response)
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div
    class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden">
        {/* <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'> */}
    </div>
    <div class="mx-auto w-48 h-32 relative -mt-16 border-4 border-white overflow-hidden">
        {/* <div><img src={`https://worshipbackend.onrender.com/uploads/${userData.idproof}`} alt="" className='object-cover object-center h-32' /></div> */}
        <div className="mx-auto w-48 h-32 relative -mt-16 border-4 border-white overflow-hidden">
          <a target="_blank" href={`https://worshipbackend.onrender.com/uploads/${userData.idproof}`} download>
         <img className="w-[100px] h-14" src={`http://localhost:5000/uploads/${userData.healthcertificate}`} alt="click to view & download pdf" />
         </a>
         <a target="_blank" href={`https://worshipbackend.onrender.com/uploads/${userData.idproof}`} download>
         <span className='text-blue-700'>Download ID Proof</span>
         </a>
       </div>
    </div>
    {/* <div class="text-center mt-2">
        <h2 class="font-semibold">John Smith</h2>
        <p class="text-gray-500">Freelance Web Designer</p>
    </div> */}
    <div className='flex flex-col pl-[15%] text-xl'>
      <div className='flex'> 
        <div>Name :  </div>
        <div><input type="text" name="name" id="user_name"  className=" w-[20%] ml-[10%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={userData.name}  /></div>
      </div>
      <div className='flex'> 
        <div>Place :   </div>
        <div><input type="text" name="location" id="user_name" className=" w-[20%] ml-[14%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={userData.location}  /></div>
      </div>
      <div className='flex'> 
        <div>Phone :   </div>
        <div><input type="text" name="phone" id="user_name" className=" w-[20%] ml-[8%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={userData.phone}  /></div>
      </div>
      <div className='flex'> 
        <div>Email : </div>
        <div><input type="text" name="email" id="user_name" className=" w-[20%] ml-[12.5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={userData.email}  /></div>
      </div>
      <div className='flex'> 
        <div>Other : </div>
        <div><input type="text" name="other" id="user_name" className=" w-[20%] ml-[10%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={userData.other}  /></div>
      </div>
      
    </div>
    <div className='pl-[30%] flex w-[40%] mt-3 '>
     <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2" onClick={()=>{handleSubmit('rejected')}} href='#'>Block</button>
     <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-5 mb-2" onClick={()=>{handleSubmit('approved')}} href='#'>Unblock</button>
    </div>
</div>

    </form>
      
    </>
  )
}
export default AdminPilgDetailPage
