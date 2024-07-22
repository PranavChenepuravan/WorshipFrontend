import React, { useEffect } from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom'
import TopNavig from '../Component/Navbar'
import SidNav from '../Archaeology/SidNavigArch'
import bac from '../Institution/Oldpaper.png'
import '../App.css'
import axios from 'axios'

export const ArchLayout = () => {
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
      else if(response?.data?.userType !=='archaeology'){
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
    <div>
        <div className='l'>  
            <TopNavig />
       
            <div className='flex w-[100%]'>
            <SidNav/>
            <div className='archback w-screen p-4'>
            <Outlet />
            <p>sadasd</p>
            </div>
            </div>
        </div>
    </div>
  )
}
export default ArchLayout
