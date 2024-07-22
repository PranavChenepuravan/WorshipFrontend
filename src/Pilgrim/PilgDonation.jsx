import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

export const PilgDonation = () => {

  const[data,setData]=useState('')
  const [userData,setUserData]=useState('')
  const [refresh,setrefresh]=useState(false)
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

  // let handleSubmit=async (event)=>{
  //   event.preventDefault()

  //   let response=await axios.post(`https://worshipbackend.onrender.com/pilgrim/pilgrimdonation`,{...data,institutionId:id,pilgrimId:pilgrimIds})
  //   console.log(response);
  // }


  let handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if data.amount contains only digits
    if (/^\d+$/.test(data.amount)) {
      // If data.amount consists only of digits, proceed with the API request
      let response = await axios.post(`https://worshipbackend.onrender.com/pilgrim/pilgrimdonation`, {
        ...data,
        institutionId: id,
        pilgrimId: pilgrimIds
      });
  
      console.log(response);
    } else {
      // Handle case where data.amount contains non-digit characters
      console.log("Invalid amount. Please enter a valid number.");
      // You can also set an error state or show a validation message to the user
    }
  };
  
  
  

  return (


    <div className="overflow-x-auto ">
    <br />
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-400">
    <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[5%] my-[5%]"><Link to='/pilglayout/pilgdonationlistall'>List</Link></button>
  
  <div className="mb-5">
      <select name="type" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" id="">
        <option value="" disabled>select type</option>
        <option value="money">Money</option>
        <option value="other">Other</option>
      </select> 
  </div>

  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution</label>
    <input value={userData.institutionName} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
    <input value={userData.location} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input value={userData.phone} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input value={userData.email} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  required />
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
    <input onChange={handleChange} type="time" name='time' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />
  </div>

  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matterial(Other)</label>
    <input onChange={handleChange} type="text" name='material' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size(Other)</label>
    <input onChange={handleChange} type="text" name='size' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" />
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight(Other)</label>
    <input onChange={handleChange} type="text" name='weight' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />
  </div>
  {/* <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Worth(Money)</label>
    <input onChange={handleChange} type="text" name='worth' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />
  </div> */}
    <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount(Money/Worth in Cash)</label>
    <input onChange={handleChange} type="text" name='amount' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"  />
  </div>

  <div className=' flex items-center gap-[10px] mt-[5%] ml-[39%]'>
  <div><button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[90%]">Proceed</button></div>
   </div>
</form>
</div>

  )
}
export default PilgDonation
