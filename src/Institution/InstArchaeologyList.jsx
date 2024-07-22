import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const InstArchaeologyList = () => {

    let id=localStorage.getItem('id')
    const [data,setdata]=useState([''])
    const [refresh,setrefresh]=useState('')

    useEffect(()=>{
        let fetchdata=async ()=>{
            let response=await axios.get(`https://worshipbackend.onrender.com/institution/archaeological/${id}`)
            console.log(response.data);
            setdata(response.data)
        }
        fetchdata()
    },[refresh])




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
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Wealth Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Size
                </th>
                <th scope="col" className="px-6 py-3">
                    Weight
                </th>
                <th scope="col" className="px-6 py-3">
                    Era of Manufacture
                </th>
                <th scope="col" className="px-6 py-3">
                    Made In
                </th>
                <th scope="col" className="px-6 py-3">
                    Material
                </th>
                <th scope="col" className="px-6 py-3">
                    Antique Value
                </th>
                <th scope="col" className="px-6 py-3">
                    Heritage
                </th>
                <th scope="col" className="px-6 py-3">
                    Sanction
                </th>
                <th scope="col" className="px-6 py-3">
                    Rating
                </th>
            </tr>
        </thead>
        <tbody className=''>
            {data.map((item,index)=>(
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td>
                        {item.archaeological ? item.archaeological.wealthid : "Wealth data is not available"}
                    </td> 
                    <td>
                        {item.archaeological ? item.archaeological.wealthname : "Wealth data is not available"}
                    </td> 
                    <td>
                        {item.archaeological ? item.archaeological.type : "Wealth data is not available"}
                    </td> 
                    <td>
                        {item.archaeological ? item.archaeological.size: "Wealth data is not available"}
                    </td> 
                    <td>
                        {item.archaeological ? item.archaeological.weight : "Wealth data is not available"}
                    </td> 

                    <td>
                        {item.archaeological ? item.archaeological.eraofmanufacture : "Wealth data is not available"}
                    </td> 
                    <td>
                        {item.archaeological ? item.archaeological.madein : "Wealth data is not available"}
                    </td> 
                    <td>
                        {item.archaeological ? item.archaeological.material: "Wealth data is not available"}
                    </td>
                    <td>
                        {item.archaeological ? item.archaeological.antiquevalue : "Wealth data is not available"}
                    </td>
                    <td>
                        {item.archaeological ? item.archaeological.heritage : "Wealth data is not available"}
                    </td>
                    <td>
                        {item.archaeological ? item.archaeological.status : "Wealth data is not available"}
                    </td>
                    <td>
                        {/* {item.archaeological ? item.archaeological.rating : "Wealth data is not available"} */}
                        <RatingStars rating={item?.archaeological?.rating} />
                    </td>
                </tr>
            ))}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 mx-[-30%]">
            </tr> 
        </tbody>
    </table>
    </>
  )
}
export default InstArchaeologyList
