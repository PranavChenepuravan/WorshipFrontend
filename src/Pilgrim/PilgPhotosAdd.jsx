import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import cam from '../Pilgrim/Camera.png'
import axios from 'axios'

export const PilgPhotosAdd = () => {

    let id = localStorage.getItem('id')
    const [data, setData] = useState([''])
    const [userdata, usersetData] = useState([''])
    const [refresh, setrefresh] = useState('')
    // const[data,setData]=useState('')

    useEffect(()=>{

        let fetchdata = async () => {
            let response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/bookinginst`)
            console.log(response.data);
            usersetData(response.data)
        }
        fetchdata()
    }, [refresh])

    

    let handlefile=(event)=>{
        console.log(event.target.file);
        setData({...data,[event.target.name]:event.target.files[0]})
        console.log(data);
    }

    let handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
        console.log(data);
    }

    let handleSubmit=async (event)=>{
        event.preventDefault()
        let formData= new FormData();
        formData.append('photo', data.photo);
        formData.append('institutionId', data.institutionId);
        formData.append('pilgrimId',id);
        let response=await axios.post('https://worshipbackend.onrender.com/pilgrim/picture',formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        console.log(response);
    }


  return (
    <>

    <form onSubmit={handleSubmit}>
    <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-[60%] h-70 border-3 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/80 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-7">
        <div class="flex flex-col items-center justify-center pt-9 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-5"><img src={cam} alt="" className='h-[35px]' /></button> */}
        </div>
        <input id="dropzone-file" name='photo' onChange={handlefile} type="file" class="hidden" />
        <div className="mb-5 flex flex-col">
           <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of Institution</label>
           <select type="text" name="institutionId" onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required>
              {userdata?.map((item,index)=>(
                
                   <option value={item._id}>

                       {item.institutionName}
                   </option>     
               
                
              ))}
              </select>
           <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt ">Save</button>
         </div>
    </label>
 
    
</div>

    </form>
  </>
  )
}
export default PilgPhotosAdd
