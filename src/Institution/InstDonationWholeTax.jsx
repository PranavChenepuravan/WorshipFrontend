import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const InstDonationWholeTax = () => {


    let id=localStorage.getItem('id')
    const [data,setData]=useState([])
    const [paydata,setPayData]=useState([])
    const [refresh,setrefresh]=useState(false)
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    useEffect(()=>{
        let fetchdata=async ()=>{
            let response=await axios.get(`https://worshipbackend.onrender.com/institution/wholedonation/${id}`)
            console.log(response)
            setData(response.data)
        }
        fetchdata()
    },[refresh])

    let handleChange=(event)=>{
        setPayData({...paydata,[event.target.name]:event.target.value})
    }

    let handleSubmit=async(totaltaxes,taxId,balance)=>{
        if (/^\d+$/.test(paydata.payed)) {
        if (parseFloat(paydata.payed) > parseFloat(balance)) {
            alert("Amount to pay cannot exceed the balance amount.");
            return; 
        }
        let response=await axios.put(`https://worshipbackend.onrender.com/admin/institutionsdonationtax/${taxId}`,{...paydata,totaltaxes:totaltaxes,status:'rejected', payeddate : formattedDate})
        console.log(response);
        setrefresh(!refresh)
    }
    }

  return (
    <>
    {data.map((item,index)=>(
    <div class="max-w-2xl mx-4 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-2xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white/90 shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden"></div>

    <div className='flex flex-col pl-[15%] text-xl'>
    <div className='flex'> 
         <div>Tax For The Date : </div>
            <h2>{item?.donation?.tax}</h2> 
        </div>
        <div className='flex'> 
            <div>Total Payed : </div>
            <h2>{item?.donation?.tax-item?.donation?.balance}</h2> 
        </div>
        <div className='flex'> 
            <div>Total Balance : </div>
            <h2>{item?.donation?.balance}</h2>
        </div>
        <div className='flex'> 
            <div>Date and Time : </div>
            <h2>{(new Date(item?.donation?.date)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</h2>
        </div>
        <div className='flex'> 
            <div>Income Tax Sanction : </div>
            <h2>{item?.donation?.status}</h2>
        </div>
        <br />

        <div className='flex flex-col pl-[15%] text-xl'>
    <div className='flex mt-3'> 
        <label htmlFor="payed" className="w-[20%]">Amount :</label>
        <input type="text" onChange={handleChange}  name="payed" id="payed" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
    </div>

    <div className='flex mt-3'> 
        <label htmlFor="bank" className="w-[20%]">Bank Name :</label>
        <input type="text" onChange={handleChange} name="bankName" id="bankName" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="account" className="w-[20%]">Account No :</label>
        <input type="text" onChange={handleChange} name="accountNo" id="accountNo" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="ifsc" className="w-[20%]">IFSC No:</label>
        <input type="text" onChange={handleChange} name="ifsc" id="ifsc" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="username" className="w-[20%]">User Name :</label>
        <input type="text" onChange={handleChange} name="username" id="username" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="password" className="w-[20%]">PIN:</label>
        <input type="password" name="password" id="password" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    {/* <div className='flex mt-3'> 
        <label htmlFor="payeddate" className="w-[20%]">Date :</label>
        <input type="date" onChange={handleChange}  name="payeddate" id="payeddate" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div> */}

<div className='flex mt-3'> 
                            <label htmlFor="date" className="w-[20%]">Date : </label>
                            <input
                                onChange={handleChange}
                                name='payeddate'
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
    <div>
    <button type="button" onClick={()=>handleSubmit(item?.donation?.tax,item?.donation?._id,item.donation.balance)} class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Pay</button>
    </div>
    <div>
        <li className='text-white'> </li>
    </div>
</div>

        


        <div>
        </div>
        <div>
            <li className='text-white'> </li>
        </div>
    </div>
</div>
))}
   
    </>
  )
}
export default InstDonationWholeTax