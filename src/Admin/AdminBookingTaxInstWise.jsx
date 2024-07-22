import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AdminBookingTaxInstWise = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust the number of items per page as needed
  const [data, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://worshipbackend.onrender.com/admin/viewinstprofile/');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item?.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by institution name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg"
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
              Community
            </th>
            <th scope="col" className="px-6 py-3">
              Photo
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
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
              <td className="px-6 py-4">{item?.email}</td>
              <td className="px-6 py-4">{item?.community}</td>
              <td className="px-6 py-4"><img src={`https://worshipbackend.onrender.com/uploads/${item?.photo}`} alt="" /></td>
              <td className="px-6 py-4">
                <Link to={`/admin/adminbookingtaxoneinst/${item?._id}`}>
                   <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                     View
                   </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
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

export default AdminBookingTaxInstWise;
