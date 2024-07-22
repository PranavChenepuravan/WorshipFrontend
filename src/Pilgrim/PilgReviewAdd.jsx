import React,{useEffect,useState} from 'react'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const PilgReviewAdd = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setData({...data,rating:newRating})
      };

      const[data,setData]=useState([''])
      const [userData,setUserData]=useState('')
      const [reviews,setReviews]=useState([''])
      const [refresh,setrefresh]=useState(false)
      let pilgrimIds=localStorage.getItem('id')
      let {id}=useParams()

      useEffect(()=>{
        let fetchdata=async ()=>{
          let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewreviewinstitution/${id}`)
          console.log(response.data);
          setUserData(response.data)
          let response1=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewReviews/${id}`)
          console.log(response1.data,'as');
          setReviews(response1.data)
        }
        fetchdata()
      },[refresh])

      let handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
      }

      let handleSubmit=async (event)=>{
        event.preventDefault()
        let response=await axios.post(`https://worshipbackend.onrender.com/pilgrim/review`,{...data,pilgrimId:pilgrimIds,institutionId:id})
        console.log(response);
        
      }





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
    <div className='flex'>

    
    <div className='flex flex-col w-[50%]'>
    <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {/* Institution Name */}
            {userData.institutionName}
            
        </h3>
        
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Location
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.location}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Email
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.email}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Phone
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.phone}
                </dd>
            </div>
            
        </dl>
    </div>
</div>

<div className='w-[100%]'>
    <form action="" onSubmit={handleSubmit}>
      <div className='text-2xl text-white'>Review</div>
       <div className='bg-white/90 w-[70%]'>
         <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
         />
        <textarea name="review" onChange={handleChange} id="" rows={30} className='w-[100%] bg-white ' ></textarea>
       </div>
       <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Done</button> 
      </form>
</div>

<div>
 
</div>

</div>


  


<div class=" flex justify-center  min-h-[40%] w-[50%] ">
    <div class="md:w-4/5 w-3/4 px-5 flex flex-col gap-2 p-5 bg-red-950/50 text-white">
        <h1 class="py-5 text-lg">Reviews</h1>
        <div class="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md">
            <ion-icon class="py-4 p-3" name="search-outline"></ion-icon>
            
        </div>
        
        {/* {reviews?.map((item, index)=>(   
        <div class="flex flex-col gap-3 mt-14">
            <div class="flex flex-col gap-4 bg-white p-4">
                <div className='flex flex-col text-black' >
                  <p>{item?.pilgrim?.name}</p>
                  <p>{item?.pilgrim?.location}</p>
                  <p>{item?.pilgrim?.email}</p>
                </div>
                <p className='text-2xl text-black'>REVIEW</p>
                <div class="flex justify justify-between">
                    <div class="flex gap-2 flex-col text-black">

                        <span>{item?.reviews?.review}</span>
                    </div>
     
                </div>

                <div className='text-black'>
                  Rating : 
                  <RatingStars rating={item?.reviews?.rating} />
                </div>
            </div>
        </div>
        ))} */}


{reviews?.map((item, index) => {
  // Check if item.pilgrim.status is 'approved'
  if (item?.pilgrim?.status === 'approved') {
    return (
      <div className="flex flex-col gap-3 mt-14" key={index}>
        <div className="flex flex-col gap-4 bg-white p-4">
          <div className="flex flex-col text-black">
            <p>{item?.pilgrim?.name}</p>
            <p>{item?.pilgrim?.location}</p>
            <p>{item?.pilgrim?.email}</p>
          </div>
          <p className="text-2xl text-black">REVIEW</p>
          <div className="flex justify-between">
            <div className="flex gap-2 flex-col text-black">
              <span>{item?.reviews?.review}</span>
            </div>
          </div>
          <div className="text-black">
            Rating: <RatingStars rating={item?.reviews?.rating} />
          </div>
        </div>
      </div>
    );
  } else {
    // If item.pilgrim.status is not 'approved', return null or placeholder
    return null; // or you can return a placeholder element
  }
})}

    </div>
</div>

<script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>


</div>






    </>
    
  )
}
export default PilgReviewAdd
