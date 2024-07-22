import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const IncomeTaxDonation = () => {
  const id = localStorage.getItem('id');
  const [userData, setUserData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
        console.log(response.data);
        setUserData(response.data);

        const location = response.data.location;
        console.log(location);

        if (location) {
          const response1 = await axios.get(`https://worshipbackend.onrender.com/incometax/donation/${location}`);
          console.log(response1.data, 'sdf');
          setDonationData(response1.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  const filteredData = donationData.filter(item =>
    item?.inst?.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Adjust the number of items per page as needed

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='flex'>
        <Link to='/incomelayout/incometaxdonationinstwise'>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Institution Wise
        </button>
        </Link>
      </div>
     <div className='pb-2'>
      <input
        type="text"
        placeholder="Search by institution name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
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
              Date and Time
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
              Payed
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800 dark:border-gray-700">
              <td>{item?.inst?.insttype}</td>
              <td>{item?.inst?.institutionName}, {item?.inst?.location}, {item?.inst?.phone}, {item?.inst?.email}</td>
              <td>{formatDate(item?.wholedon?.date)}</td>
              <td>{item?.wholedon?.bankName},{item?.wholedon?.accountNo}</td>
              <td>{item?.wholedon?.totalSum}</td>
              <td>{item?.wholedon?.tax}</td>
              <td>
                {isNaN(item?.wholedon?.tax - item?.wholedon?.balance) 
                  ? '' 
                  : item?.wholedon?.tax - item?.wholedon?.balance
                }
              </td>
              <td>{item?.wholedon?.balance}</td>
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

export default IncomeTaxDonation;
