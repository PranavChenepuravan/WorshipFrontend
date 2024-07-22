import React,{useEffect} from 'react'
import { Link,Outlet,useNavigate } from 'react-router-dom'
import TopNavig from '../Component/Navbar'
import SidNav from '../Institution/SidNavigInst'
import bac from '../Institution/Oldpaper.png'
import '../App.css'
import axios from 'axios'


export const InstLayout = () => {

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
      else if(response?.data?.userType !=='institution'){
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
            <div className='instback w-[100%] p-4'>
            <Outlet />
            </div>
            </div>
        </div>
    </div>
  )
}
export default InstLayout
