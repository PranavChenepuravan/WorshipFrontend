import React,{useEffect,useState} from 'react'
import axios from 'axios'

export const PilgDonationListAll = () => {

    let id=localStorage.getItem('id')
    const [data,setData]=useState([''])
    const [refresh,setrefresh]=useState(false)

    useEffect(()=>{
        let fetchdata=async ()=>{
            let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/pilgrimdonation/${id}`)
            console.log(response.data);
            setData(response.data)
        }
        fetchdata()
    },[refresh])
  return (
    <>
     <div className='text-3xl text-yellow-200'>Money</div>
     <div className='flex flex-col'>
    <div className="  overflow-x-auto  ">
    {/* <input type="text" id="user_name" classNmae="mx-[20%]  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2 ">Search</button>     */}
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Institution Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Place
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Date 
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Tax
                </th> */}

                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                {/* <th>

                </th> */}
            </tr>
        </thead>
        <tbody>
            {data.map((item,index)=>(
                item.material ? (null) :
                <tr className="bg-white border-b text-black">
                <td>
                  {item.usersInfo?.insttype}
                </td>
                <td>
                  {item.usersInfo?.institutionName}
                </td>
                <td>
                  {item.usersInfo?.location}
                </td>
                <td>
                  {item.usersInfo?.phone}
                </td>
                <td>
                  {item.usersInfo?.email}
                </td>
                <td>
                  {item.date}
                </td>
                <td>    
                  {item.time}
                </td>
                <td>    
                  {item.amount}
                </td>
                <td>
                  {item.status} 
                </td>
                
            </tr>
                
            ))}

        </tbody>
    </table>
    
</div>
{/* <div><button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[90%]">Print</button></div> */}
</div>
<div className='text-3xl text-yellow-200'>Other</div>
<div className='flex flex-col'>
    <div className="  overflow-x-auto  ">
    {/* <input type="text" id="user_name" classNmae="mx-[20%]  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2 ">Search</button>     */}
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Institution Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Place
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Date 
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Weight
                </th>
                <th scope="col" className="px-6 py-3">
                    Material
                </th>
                <th scope="col" className="px-6 py-3">
                    Worth(In Cash)
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
        {data.map((item,index)=>(
            item.material ? (
            <tr className="bg-white border-b text-black">
                <td>
                  {item.usersInfo?.insttype}
                </td>
                <td>
                  {item.usersInfo?.institutionName}
                </td>
                <td>
                  {item.usersInfo?.location}
                </td>
                <td>
                  {item.usersInfo?.phone}
                </td>
                <td>
                  {item.usersInfo?.email}
                </td>
                <td>
                  {item.date}
                </td>
                <td>    
                  {item.time}
                </td>
                <td>
                    {item.weight}
                </td>
                <td>
                    {item.material}
                </td>
                <td>    
                  {item.amount}
                </td>
                <td>
                    {item.status}
                </td>

            </tr>
            ):null
            ))}
   
        </tbody>
    </table>
    
</div>
{/* <div><button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-[90%]">Print</button></div> */}
</div>



    </>
  )
}
export default PilgDonationListAll
