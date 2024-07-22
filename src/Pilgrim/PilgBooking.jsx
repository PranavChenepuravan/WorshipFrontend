import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom' 
import axios from 'axios'

export const PilgrimBooking = () => {

  const[data,setData]=useState('')
  const [userData,setUserData]=useState('')
  const [refresh,setrefresh]=useState(false)
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  let pilgrimIds=localStorage.getItem('id')
  let {id}=useParams()
  

  useEffect(()=>{
    let fetchdata=async ()=>{
      let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`)
      console.log(response.data);
      setUserData(response.data)
    }
    fetchdata()
  },[refresh])
  


  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  let handleSubmit=async (event)=>{
    event.preventDefault()

    let response=await axios.post(`https://worshipbackend.onrender.com/pilgrim/booking`,{...data,institutionId:id,pilgrimId:pilgrimIds,amount:userData.visitamount,bookeddate:formattedDate})
    console.log(response);
    window.location.reload()
    

    
  }

  

  const handlePageClick = ({ selected }) => {
    setShowPaymentDetails(true);
  };
  
 
  return (

<>

<form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400">
   <div className='flex'> 
    <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]"><Link to='/pilglayout/pilgbookinglist'>List</Link></button>
  </div>
  <div className="mb-5">
   <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Type</label>
   <input onChange={handleChange} name='institutiontype' value={userData.insttype} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
    <input onChange={handleChange} name="location" type="text" value={userData.location} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className="mb-5">
  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of Institution</label>

  <input onChange={handleChange} name='nameofinstitution' value={userData.institutionName} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />     
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input onChange={handleChange} name='phone' value={userData.phone} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" minLength={10} maxLength={11} required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input onChange={handleChange} name='email' value={userData.email} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
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
    <input onChange={handleChange} name='time' type="time" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required />
  </div>
  <div className=' flex items-center gap-[10px] mt-[5%] ml-[5%]'>
      <div>Amount : </div>
      <input onChange={handleChange} name='amount' type="text" id="first_name" className="w-[25%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userData.visitamount} />
      <button onClick={handlePageClick} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[15%]">Confirm</button>
      {/* <button onClick={handlePageClick} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Pay</button> */}
   </div>




{showPaymentDetails && (
<div class="max-w-2xl mx-4 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-2xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-xl rounded-lg text-gray-900 absolute top-60 left-96 w-[70%]">
    <div class="rounded-t-lg h-32 overflow-hidden"></div>

    <div className='flex flex-col pl-[15%] text-xl'>


        <br />

        <div className='flex flex-col pl-[15%] text-xl'>
    <div className='flex mt-3'> 
        <label htmlFor="payed" className="w-[20%]">Amount :</label>
        <input type="text" onChange={handleChange} name="payed" id="payed" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userData.visitamount}  />
    </div>

    <div className='flex mt-3'> 
        <label htmlFor="bankName" className="w-[20%]">Bank Name :</label>
        <input type="text" onChange={handleChange} name="bankName" id="bankName" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="accountNo" className="w-[20%]">Account No :</label>
        <input type="text" onChange={handleChange} name="accountNo" id="accountNo" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="ifscNo" className="w-[20%]">IFSC No :</label>
        <input type="text" onChange={handleChange} name="ifscNo" id="ifscNo" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="userName" className="w-[20%]">User Name :</label>
        <input type="text" onChange={handleChange} name="userName" id="userName" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="password" className="w-[20%]">PIN :</label>
        <input type="password" name="" id="password" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
                            <label htmlFor="date" className="w-[20%]">Date : </label>
                            <input
                                onChange={handleChange}
                                name='date'
                                type="date"
                                id="date"
                                className="ml-[5%] w-[60%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={formattedDate}
                                min={formattedDate}
                                max={formattedDate}
                                required
                            />        
    </div>
    <br />

        <div className='mt-3 flex'> {/* Centering the Pay button */}
            <button type="submit"  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Pay</button>
        </div>


    <div>
        <li className='text-white'> </li>
    </div>
</div>




        <div>
            <li className='text-white'> </li>
        </div>
    </div>
</div>

)}


</form>


</>
  )
}
export default PilgrimBooking
