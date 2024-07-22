import React,{ useEffect } from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import SideNavig from '../Component/SideBar'
import TopNavig from '../Component/Navbar'
import Bacgr from '../Component/Admback'
import axios from 'axios'

export const AdminLayout = () => {

  let navigate=useNavigate()
  
  useEffect(()=>{
    let id=localStorage.getItem('id')
    let email=localStorage.getItem('email')
    let auth=async ()=>{

      let response=await axios.post('https://worshipbackend.onrender.com/authenticate',{_id:id,email:email})
      console.log(response);
      if(response==null){
        navigate('/login')
      }
      else if(response?.data?.userType !=='admin'){
        navigate('/login')
      }
 
    }
    if(id){

      auth()
    }
    else{
      navigate('/login')
    }
  },[])


  return (

    <div className='flex flex-col'>
      <TopNavig />
      <div className='flex'>
        <SideNavig />
        <div className='admback w-screen p-4'>
          <Outlet />
        </div>
      </div>

    </div>



  )
}
export default AdminLayout
