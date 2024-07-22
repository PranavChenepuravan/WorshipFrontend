import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const InstVisit = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [data, setData] = useState(['']);
  const [searchQuery, setSearchQuery] = useState('');

  let id = localStorage.getItem('id');

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axios.get(`https://worshipbackend.onrender.com/institution/visitingBooking/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = searchQuery
    ? data.filter(item => item?.pilgrims?.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : data;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex pb-2">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by pilgrim's name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[20%] h-[2%]"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
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
              Bank
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Tax
            </th>
            <th scope="col" className="px-6 py-3">
              Booked Date
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{item?.pilgrims?.name}</td>
              <td className="px-6 py-4">{item?.pilgrims?.location}</td>
              <td className="px-6 py-4">{item?.pilgrims?.phone}</td>
              <td className="px-6 py-4">{item?.pilgrims?.email}</td>
              <td className="px-6 py-4">{ new Date(item?.bookings?.date).toLocaleDateString()}</td>
              <td className="px-6 py-4">{item?.bookings?.time}</td>
              <td className="px-6 py-4">{item?.bookings?.bankName},{item?.bookings?.accountNo}</td>
              <td className="px-6 py-4">{item?.bookings?.amount}</td>
              <td className="px-6 py-4">{item?.bookings?.tax}</td>
              <td className="px-6 py-4">{ new Date(item?.bookings?.bookeddate).toLocaleDateString()}</td>
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
    </div>
  );
};

export default InstVisit;
