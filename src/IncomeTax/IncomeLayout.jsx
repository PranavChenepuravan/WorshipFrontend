import React, { useEffect } from 'react'
import { Link,Outlet,useNavigate } from 'react-router-dom'
import TopNavig from '../Component/Navbar'
import SidNav from '../IncomeTax/SidNavigIncome'
import bac from '../Institution/Oldpaper.png'
import '../App.css'
import axios from 'axios'
import image1 from './Agar.png'

export const IncomeLayout = () => {

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
      else if(response?.data?.userType !=='incometax'){
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
        <div className=''>  
            <TopNavig />
            <div className='flex '>
            <SidNav/>
            <div className='incomback w-screen p-4'>
            <Outlet />
            </div>
            </div>
        </div>
    </div>
  )
}
export default IncomeLayout
