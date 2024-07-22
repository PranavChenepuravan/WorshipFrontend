import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export const IncomeTaxReportDonation = () => {
    let id = localStorage.getItem('id')
    const [userData,setUserData]=useState([])
    const [donationData,setDonationData]=useState([])
    const [refresh,setrefresh]=useState(false)


    const handlePrint = () => {
        // Gather all booking data for printing
        const printableData = donationData.map(item => ({
          bookingId: item?.wholedon._id,
          instType: item?.inst?.insttype,
          institution: `${item?.inst?.institutionName}, ${item?.inst?.location}, ${item?.inst?.phone}, ${item?.inst?.email}`,
          date: item?.wholedon?.date,
          amount: item?.wholedon?.totalSum,
          tax: item?.wholedon?.tax,
          payed : item?.wholedon?.tax - item?.wholedon?.balance ,
          status: item?.wholedon?.status

        }));
    
        // Format the data for printing
        const printableContent = printableData.map(item => (
          `Booking ID: ${item.bookingId}\n` +
          `InstType: ${item.instType}\n` +
          `Institution: ${item.institution}\n` +
          `Date: ${item.date}\n` +
          `Amount: ${item.amount}\n` +
          `Tax: ${item.tax}\n` +
          `Payed: ${item.payed}\n`+
          `status: ${item.status}\n\n`
        )).join('');
    
        // Open a new window and print the data
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<pre>${printableContent}</pre>`);
        printWindow.document.close();
        printWindow.print();
      };





    useEffect(()=>{
        let fetchdata=async ()=>{
            let response=await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`)
            console.log(response.data);
            setUserData(response.data)

            let location = response.data.location;
            console.log(location)

            if(location)
            {
                let response1=await axios.get(`https://worshipbackend.onrender.com/incometax/donation/${location}`)
                console.log(response1.data,'sdf')
                setDonationData(response1.data)
            }
        }
        fetchdata()
    },[refresh])
    



    



  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Adjust the number of items per page as needed

  const pageCount = Math.ceil(donationData?.length / itemsPerPage);


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = donationData.slice(indexOfFirstItem,indexOfLastItem);
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
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
  
            </tr>
      </thead>

      <tbody>
    {currentItems.map((item,index)=>(
        <tr className="bg-white dark:bg-gray-800 dark:border-gray-700" key={index}>
            <td>{item?.inst?.insttype}</td>
            <td>{item?.inst?.institutionName},{item?.inst?.location},{item?.inst?.phone},{item?.inst?.email}</td>
            <td>{item?.wholedon?.date}</td>
            <td>{item?.wholedon?.totalSum}</td>
            <td>{item?.wholedon?.tax}</td>
            <td>
                {isNaN(item?.wholedon?.tax - item?.wholedon?.balance) 
                    ? '' 
                    : item?.wholedon?.tax - item?.wholedon?.balance
                }
            </td>
            <td>{item?.wholedon?.balance}</td>
            <td>{item?.wholedon?.status}</td>
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
export default IncomeTaxReportDonation