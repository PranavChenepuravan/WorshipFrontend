import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export const IncomeTaxReportBooking = () => {
  let id = localStorage.getItem('id');
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
 
//  printing
 
 
 
  const handlePrint = () => {
    // Gather all booking data for printing
    const printableData = bookingData.map(bookingItem => ({
      bookingId: bookingItem.bookings._id,
      instType: bookingItem?.institution?.insttype,
      institution: `${bookingItem?.institution?.institutionName}, ${bookingItem?.institution?.location}, ${bookingItem?.institution?.phone}, ${bookingItem?.institution?.email}`,
      date: bookingItem.bookings.date,
      amount: bookingItem.bookings.amount,
      tax: bookingItem.bookings.tax,
      status: bookingItem.bookings.status
    }));

    // Format the data for printing
    const printableContent = printableData.map(item => (
      `Booking ID: ${item.bookingId}\n` +
      `InstType: ${item.instType}\n` +
      `Institution: ${item.institution}\n` +
      `Date: ${item.date}\n` +
      `Amount: ${item.amount}\n` +
      `Tax: ${item.tax}\n` +
      `Status: ${item.status}\n\n`
    )).join('');

    // Open a new window and print the data
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${printableContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

//printing end



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`);
        setUserData(response.data);

        const location = response.data.location;
        if (location) {
          const response1 = await axios.get(`https://worshipbackend.onrender.com/incometax/booking/${location}`);
          setBookingData(response1.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  
  const pageCount = Math.ceil(bookingData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);
  
  
  return (
    <>
      <div className='flex'>
      <button 
          type="button" 
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          onClick={handlePrint} // Add onClick event for printing
        >
          Print
        </button>       
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">InstType</th>
            <th scope="col" className="px-6 py-3">Institution Address</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">Tax</th>
          
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((bookingItem, index) =>
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                <td>{bookingItem?.institution?.insttype}</td>
                <td className='px-5'>{bookingItem?.institution?.institutionName}, {bookingItem?.institution?.location}, {bookingItem?.institution?.phone}, {bookingItem?.institution?.email}</td>
                <td>{bookingItem.bookings.date}</td>
                <td className='px-5'>{bookingItem.bookings.amount}</td>
                <td className='px-5'>{bookingItem.bookings.tax}</td>
             
                <td className='px-5'>{bookingItem.bookings.status}</td>
              </tr>
          )}
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

export default IncomeTaxReportBooking;
