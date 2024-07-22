import React,{ useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'


const Login = () => {
    const navigate=useNavigate()
    const[data,setData]=useState('')
    let handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
    }
    let handleSubmit=async (event)=>{
        event.preventDefault()
        try{

        const requiredField = ['email','password'];

        for(const field of requiredField){
            if(!data[field]){
                return 
            }
        }

        let response=await axios.post('https://worshipbackend.onrender.com/login',data)
        console.log(response);
        if(response.data){
            localStorage.setItem('id',response.data._id)
            localStorage.setItem('email',response.data.email)
            if(response.data.userType=='admin'){
                navigate('/admin')
            }
            else if(response.data.userType=='archaeology'){
                if(response.data.status=='approved'){
                    navigate('/archlayout')
                    toast.success('Login Success')
                }
            }
            else if(response.data.userType=='incometax'){
                if(response.data.status=='approved'){
                    navigate('/incomelayout')
                }    
            }
            else if(response.data.userType=='institution'){
                if(response.data.status=='approved'){
                    navigate('/instlayout')
                }
            }
            else if(response.data.userType=='pilgrim'){
                if(response.data.status=='approved'){
                    navigate('/pilglayout')
                }    
            }
            else{
                
            }
        }
        
    }
    catch(e){
        toast.error('invalid username or password')
    }


        setData(data)
        console.log(data);

    }

    
  return (
    <>

    <ToastContainer/>
    <div className='back text-white pt-10 text-center w-[100%] h-[885px]'>
      
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-black/70 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>
                      <input onChange={handleChange}  type="email" name="email" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <br />
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                      <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <br /><br />
                  <div className="flex items-center justify-between">

                  </div>
                  <button type="submit"  className="w-28 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black/50">Log in</button>
              </form>
          </div>
      </div>
  </div>
      
      </div>
    </>
  )
}
export default Login
