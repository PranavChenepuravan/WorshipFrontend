import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const IncomeTaxBooking = () => {
  let id = localStorage.getItem('id');
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
        console.log(response.data);
        setUserData(response.data);

        let location = response.data.location;
        console.log(location);
        if (location) {
          let response1 = await axios.get(`https://worshipbackend.onrender.com/incometax/booking/${location}`);
          console.log(response1.data, 'sda');
          setBookingData(response1.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  console.log(bookingData, 'asd');

  let handleChange = event => {
    setSearchQuery(event.target.value);
  };

  let handleSubmit = async (statuss, userid) => {
    setRefresh(!refresh);
    let response2 = await axios.put(`https://worshipbackend.onrender.com/incometax/booking/${userid}`, { status: statuss });
    console.log(response2);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Adjust the number of items per page as needed

  const filteredBookingData = bookingData.filter(bookingItem =>
    bookingItem?.institution?.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBookingData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookingData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='flex'>
        <Link to='/incomelayout/incometaxbookinginstwise'>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Institution Wise</button>
        </Link>
      </div>

    <div className='pb-2'>
      <input
        type="text"
        placeholder="Search by institution name"
        value={searchQuery}
        onChange={handleChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              InstType
            </th>
            <th scope="col" className="px-6 py-3">
              Institution Address
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Tax
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((bookingItem, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>{bookingItem?.institution?.insttype}</td>
                <td className='px-5'>{bookingItem?.institution?.institutionName},{bookingItem?.institution?.location},{bookingItem?.institution?.phone},{bookingItem?.institution?.email}</td>
                <td>{formatDate(bookingItem?.bookings?.date)}</td>
                <td className='px-5'>{bookingItem?.bookings?.amount}</td>
                <td className='px-5'>{bookingItem?.bookings?.tax}</td>
              </tr>
          ))}
        </tbody>
      </table>

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
    </>
  );
};

export default IncomeTaxBooking;
