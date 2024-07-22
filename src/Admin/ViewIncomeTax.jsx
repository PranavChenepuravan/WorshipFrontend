import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ViewIncomeTax = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Adjust the number of items per page as needed
  const [data, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://worshipbackend.onrender.com/admin/viewnewincomeprofile/');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item?.location.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Search by location"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
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
              Photo
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="bg-white border-b text-black">
              <td className="px-6 py-4">{item?.departmentName}</td>
              <td className="px-6 py-4">{item?.location}</td>
              <td className="px-6 py-4">{item?.phone}</td>
              <td className="px-6 py-4">{item?.email}</td>
              <td className="px-6 py-6"><div className='w-28 h-20 mb-2'><img src={`https://worshipbackend.onrender.com/uploads/${item?.photo}`} alt="" /></div></td>
              <td className="px-6 py-4">{item?.status}</td>
              <td className="px-6 py-4">
                <Link to={`/admin/admindeptdetailpage/${item?._id}`}>
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

export default ViewIncomeTax;
