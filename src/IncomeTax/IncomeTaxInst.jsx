import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const IncomeTaxInst = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust the number of items per page as needed

  const [data, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        const response1 = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
        const location = response1.data.location;
        if (location) {
          const response = await axios.get(`https://worshipbackend.onrender.com/admin/viewinstprofile2/${location}`);
          setUserData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = data.filter(item =>
      item?.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered results:', filteredResults); // Debugging statement
    setFilteredData(filteredResults);
  }, [data, searchQuery]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
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
              Head
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
              <td className="px-6 py-4">{item?.institutionName}</td>
              <td className="px-6 py-4">{item?.insttype}</td>
              <td className="px-6 py-4">{item?.location}</td>
              <td className="px-6 py-4">{item?.phone}</td>
              <td className="px-6 py-4">{item?.email}</td>
              <td className="px-6 py-4">{item?.caretaker}</td>
              <td className="px-6 py-9">
                <div className='w-28 h-20'>
                  <img src={`https://worshipbackend.onrender.com/uploads/${item?.photo}`} alt="" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex">
                  <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <Link to={`/incomelayout/incometaxinstdetailpage/${item?._id}`}>View</Link>
                  </button>
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

export default IncomeTaxInst;
