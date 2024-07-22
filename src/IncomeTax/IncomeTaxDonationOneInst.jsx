import React, {useEffect,useState} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom'

export const IncomeTaxDonationOneInst = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust the number of items per page as needed


    let {id}=useParams()
    
    const [wholedonationData,setWholedonationData]=useState([])
    const [refresh,setrefresh]=useState(false)
    const [totalTax, setTotalTax] = useState(0);
    const [totalPayed, setTotalPayed] = useState()
    const [status, setStatus ] = useState('');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    // const [date, setDate]= useState('')
    const[data,setData]=useState('')


    useEffect(()=>{
        const fetchData = async () =>{

            const response = await axios.get(`https://worshipbackend.onrender.com/incometax/wholedonation/${id}`)
            console.log("Donataion Response Data", response.data)
            setWholedonationData(response.data)

        };
        fetchData();
    },[refresh]);


    let handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
      }


      let handleSubmit = async (status,txtid) => {
        let response = await axios.put(`https://worshipbackend.onrender.com/incometax/wholedonationstatus/${txtid}`, {status : status })
        console.log(response);
        
      };



  
    const pageCount = Math.ceil(wholedonationData.length / itemsPerPage);
  
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
              <th scope="col" className="px-6 py-3">
                  Date and Time
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
                  Bank
              </th>
              <th scope="col" className="px-6 py-3">
                  Status
              </th>
              <th scope="col" className="px-6 py-3">
                  Sanction
              </th>
              <th></th>
          </tr>
    </thead>
<tbody>
  {wholedonationData.map((item, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td>{(new Date(item.date)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</td>
        <td>{item?.tax}</td>
        <td>{item?.tax - item?.balance}</td>
        <td>{item?.balance}</td>
        <td>{item?.bankName},{item?.accountNo}</td>
        <td>{item?.status}</td>
        <td>
        <button type="submit" onClick={() => handleSubmit('approved', item._id)}  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-6 w-22">Approve</button>
        <button type="submit" onClick={() => handleSubmit('rejected', item._id)}  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-6 w-22">Reject</button>
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


    </>
  )
}
export default IncomeTaxDonationOneInst