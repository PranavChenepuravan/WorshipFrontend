import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const InstBookingTax = () => {

  let id = localStorage.getItem('id')
  const [bookingData,setBookingData]=useState([])
  const [refresh,setrefresh]=useState(false)


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`https://worshipbackend.onrender.com/institution/booking2/${id}`);
        console.log(response.data);
        setBookingData(response.data); // Set bookingData state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, [id, refresh]); // Include id and refresh as dependencies


  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25; // Adjust the number of items per page as needed

  const pageCount = Math.ceil(bookingData.length / itemsPerPage);


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <>
    <Link to={`/instlayout/instbookingtaxtotal/${id}`}><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Total</button></Link>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
          <th scope="col" className="px-6 py-3">
                  Pilgrim Name
              </th>
              <th scope="col" className="px-6 py-3">
                  Email
              </th>
              <th scope="col" className="px-6 py-3">
                  Phone
              </th>
              <th scope="col" className="px-6 py-3">
                  Date
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
          </tr>
    </thead>
<tbody>
  {currentItems.map((item, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td>{item?.pilgrims?.name}</td>
      <td>{item?.pilgrims?.email}</td>
      <td>{item?.pilgrims?.phone}</td>
      <td>{formatDate(item?.bookings?.date)}</td>
      <td><td className="px-6 py-4">{item?.bookings?.bankName},{item?.bookings?.accountNo}</td></td>
      <td>{item?.bookings?.amount}</td>
      <td>{item?.bookings?.tax}</td>
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
  )
}
export default InstBookingTax
