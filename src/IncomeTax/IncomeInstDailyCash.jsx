import React, {useEffect,useState} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom'

export const IncomeInstDailyCash = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust the number of items per page as needed


    let {id}=useParams()
    
    const [DailyCashData,setDailyCashData]=useState([])
    const [refresh,setrefresh]=useState(false)
    const [totalTax, setTotalTax] = useState(0);
    const [totalPayed, setTotalPayed] = useState()
    const [status, setStatus ] = useState('');
    // const [date, setDate]= useState('')
    const[data,setData]=useState('')


    useEffect(()=>{
        const fetchData = async () =>{

            const response = await axios.get(`https://worshipbackend.onrender.com/institution/dailyincome/${id}`)
            console.log("Donataion Response Data", response.data)
            setDailyCashData(response.data)

        };
        fetchData();
    },[refresh]);









  
    const pageCount = Math.ceil(DailyCashData.length / itemsPerPage);
  
  
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
                  Date
              </th>
              <th scope="col" className="px-6 py-3">
                  Income 
              </th>
              <th scope="col" className="px-6 py-3">
                  Expense
              </th>
              <th scope="col" className="px-6 py-3">
                  Balance
              </th>
          </tr>
    </thead>
<tbody>
  {DailyCashData.map((item, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td>{item?.date}</td>
      <td>{item?.income}</td>
      <td>{item?.expense}</td>
      <td>{item?.amount}</td>

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
export default IncomeInstDailyCash