import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const IncomeTaxDonationInstWise = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust the number of items per page as needed
  const id = localStorage.getItem('id');
  const [data, setUserData] = useState(['']);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://worshipbackend.onrender.com/incometax/viewinstprofile/${id}`);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  const filteredData = data.filter(item =>
    item?.institution?.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search by institution name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4"
      />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
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
              Community
            </th>
            <th scope="col" className="px-6 py-3">
              Photo
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{item?.institution?.institutionName}</td>
              <td className="px-6 py-4">{item?.institution?.insttype}</td>
              <td className="px-6 py-4">{item?.location}</td>
              <td className="px-6 py-4">{item?.institution?.phone}</td>
              <td className="px-6 py-4">{item?.institution?.email}</td>
              <td className="px-6 py-4">{item?.institution?.community}</td>
              <td className="px-6 py-9">
                <div className='w-28 h-20'>
                <img src={`https://worshipbackend.onrender.com/uploads/${item?.institution?.photo}`} alt="" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <Link to={`/incomelayout/incometaxdonationoneinst/${item?.institution?._id}`}>
                  <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32">
                    View
                  </button>
                  </Link>
                  <Link to={`/incomelayout/incomeinstdailycash/${item?.institution?._id}`}>
                  <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-7 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 w-32">
                     Dily Cash
                  </button>
                  </Link>
                </div>
              </td>
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

export default IncomeTaxDonationInstWise;
