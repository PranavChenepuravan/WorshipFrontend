import React,{ useEffect ,useState } from 'react'
import boy from '../Pilgrim/Boy.jpg'
import { Link } from 'react-router-dom' 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const IncomeProfileEdit = () => {
  let id=localStorage.getItem('id')
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

  let handleSubmit=async (event)=>{
    try{
    event.preventDefault()
    if(data.cpassword!=data.password){

  
    }
    else{
    setrefresh(!refresh)
    let response=await axios.put(`https://worshipbackend.onrender.com/pilgrim/editprofile/${id}`,data)
    console.log(response);
    if(response){
      toast.success('Success')
    }

    setData('')
    
    }
  }
  catch(e){
   console.log(e,'-------------------');
   toast.error( e.response.data.message || e.message)
  }
  }

  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleSubmit}>
    <div
    class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden">
        {/* <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'> */}
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <div><img src={`https://worshipbackend.onrender.com/uploads/${userData.photo}`} alt="" className='object-cover object-center h-32' /></div>
        {/* <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front'> */}
    </div>
    {/* <div class="text-center mt-2">
        <h2 class="font-semibold">John Smith</h2>
        <p class="text-gray-500">Freelance Web Designer</p>
    </div> */}
    <div className='flex flex-col pl-[15%] text-xl'>
      <div className='flex'> 
        <div>Place :   </div>
        <div><input type="text" name="location" id="user_name" className=" w-[20%] ml-[14%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder={userData.location}  /></div>
      </div>
      <div className='flex'> 
        <div>Adress : </div>
        <div><input type="text" name="other" id="user_name" className=" w-[20%] ml-[10%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder={userData.other}  /></div>
      </div>
      <div className='flex'> 
        <div>Phone :   </div>
        <div><input type="text" name="phone" id="user_name" className=" w-[20%] ml-[8%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder={userData.phone} minLength={10} maxLength={11}  /></div>
      </div>
      <div className='flex'> 
        <div>Email : </div>
        <div><input type="text" name="email" id="user_name" className=" w-[20%] ml-[12.5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder={userData.email}  /></div>
      </div>
      <div className=''> 
        <div>Change Password : </div>
        <div className='ml-16 mr-24'><input type="password" name="password" id="user_name" className=" w-[20%] ml-[12.5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}  minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"  /></div>
      </div>
      <div className='mb-2'> 
        <div>Confirm Password : </div>
        <div className='ml-16 mr-24'><input type="password" name="cpassword" id="user_name" className=" w-[20%] ml-[12.5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} minLength={8} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" /></div>
      </div>

      
    </div>
    <div className='pl-[30%] flex'>
        <li className='text-white'> </li>
        <Link to="/incomelayout/incomeprofile">
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 w-28">Cancel</button>
        </Link>
        <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 w-28">Save</button>
    </div>
</div>

    </form>
      
    </>
  )
}
export default IncomeProfileEdit
