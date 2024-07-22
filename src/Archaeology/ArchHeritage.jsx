import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const ArchHeritage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust the number of items per page as needed
  const [data, setData] = useState(['']);
  const [searchTerm, setSearchTerm] = useState('');

  const [status,setStatus] = useState('pending')

  // Filtering data based on search term
  const filteredData = data.filter(item => {
    // Ensure item?.institutionname is defined before calling toLowerCase()
    return (item?.institutionname || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredTotalData = filteredData?.filter((i)=> i.status === status)
  console.log(filteredTotalData.length,'filteredTotalData')
  const pageCount = Math.ceil(filteredTotalData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  let id = localStorage.getItem('id');

  const [userData, setUserData] = useState('');
  const [rating, setRating] = useState('');

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
      setUserData(response.data);

      let response1 = await axios.get(`https://worshipbackend.onrender.com/archaeology/archheritage/${id}`);
      setData(response1.data);
    };
    fetchData();
  }, [refresh]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  let handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let handleSubmit = (statuss, newid) => {
    let response1 = axios.put(`https://worshipbackend.onrender.com/archaeology/manageHeritage/${newid}`, { rating: rating, status: statuss });
    console.log(response1);
  };





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
    <div className="overflow-x-auto">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by institution name"
        value={searchTerm}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="">
        <button onClick={()=>setStatus('pending')}  className='bg-white text-black shadow-md px-3 py-2 rounded-md mb-2'>New</button>
        <button onClick={()=>setStatus('approved')} className='bg-white text-black shadow-md px-3 py-2 rounded-md ms-2 mb-2'>Existing</button>
        
      </div>

      {/* Table and pagination */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {/* Table header */}
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Institution Type
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Photo
            </th>
            <th scope="col" className="px-6 py-3">
              Heritage
            </th>
            <th scope="col" className="px-9 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Table body */}
          {filteredData?.filter((i)=> i.status === status ).slice(indexOfFirstItem, indexOfLastItem) .map((item, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.institutionname}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.institutiontype}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.location}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.email}
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.phone}
              </td>
              <td scope="row" className="px-4 py-9 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className='w-28 h-20'>
                <img src={`https://worshipbackend.onrender.com/uploads/${item?.photo}`} className='w-48 h-38 pb-2' alt="" />
                </div>
              </td>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.heritage}
              </td>
             { item.status !== 'approved' &&  <td className='px-2 py-11'>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </td>}
              { item.status === 'approved' &&  <td className='px-2 py-11'>
              <RatingStars rating={item?.rating} />
              </td>}
              <td className="px-4 py-4">
                <div>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[90%]"
                    onClick={() => handleSubmit('approved', item._id)}
                  >
                    Approve
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[90%]"
                    onClick={() => handleSubmit('rejected', item._id)}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between text-white w-24 mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default ArchHeritage;
