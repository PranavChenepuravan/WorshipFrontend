import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const InstArchHeritageCertified = () => {

  let id = localStorage.getItem('id')
  const [data,setData]=useState([])
  const [refresh,setrefresh]=useState('')

  useEffect(()=>{
    let fetchdata=async ()=>{
      let resopone=await axios.get(`https://worshipbackend.onrender.com/institution/archheritage/${id}`)
      console.log(resopone.data);
      setData(resopone.data)     
    }
    fetchdata()
  },[refresh])


console.log(data);




const RatingStars = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
  
    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={stars.length} />);
    }
  
    // Fill remaining stars (if any) with empty stars
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={stars.length} className="text-gray-300" />);
    }
  
    return <div className="flex">{stars}</div>;
  };

  return (
    <>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {data.map((item, index) => (
        <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-4 md:pb-6">
                <img src={`https://worshipbackend.onrender.com/uploads/${item?.photo}`} alt="" className="object-cover object-center h-32" />
                <div className="mt-4 md:mt-6 flex flex-col px-4">
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Name:</div>
                        <div>{item?.institutionname}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Type:</div>
                        <div>{item?.institutiontype}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Location:</div>
                        <div>{item?.location}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Phone:</div>
                        <div>{item?.phone}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Email:</div>
                        <div>{item?.email}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Heritage:</div>
                        <div>{item?.heritage}</div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="font-medium mr-2">Status:</div>
                        <div>{item?.status}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-medium mr-2">Rating:</div>
                        <RatingStars rating={item?.rating} />
                        
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>




    </>
  )
}
export default InstArchHeritageCertified
