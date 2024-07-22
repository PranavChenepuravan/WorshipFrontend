import React, {useEffect,useState} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom'

export const AdminBookingTaxOneInst = () => {

    let {id}=useParams()
    const [bookingData,setBookingData]=useState([])
    const [refresh,setrefresh]=useState(false)
    const [totalTax, setTotalTax] = useState(0);
    const[data,setData]=useState([''])
    const [totdata,setTotdata]=useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`https://worshipbackend.onrender.com/admin/bookingtaxinst/${id}`);
                console.log(id,'Id came here')
                console.log("Response Data:", response.data);
                setBookingData(response.data);
                
                const totalTaxSum = response.data.reduce((sum, item) => {
                    console.log(item,'-=-=-=-=-=-=-=-=-');
                    console.log("Item Tax:", item.tax);
                    console.log("Current Sum:", sum);
                    return sum + item.tax;
                }, 0);
                
                console.log("Total Tax Sum:", totalTaxSum);
                const roundedTotalTaxSum = totalTaxSum.toFixed(2);
                setTotalTax(roundedTotalTaxSum);

                const response1 = await axios.get(`https://worshipbackend.onrender.com/admin/institionsbookingtax/${id}`)
                console.log("Response 1 Data", response1.data)
                setTotdata(response1.data)



            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchdata();
    }, [id, refresh]);



    let handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
      }


    let handleSubmit=async (event)=>{
        event.preventDefault()
        let response=await axios.post(`https://worshipbackend.onrender.com/admin/institionsbookingtax`,{...data,institutionId:id,totaltax:totalTax})
        console.log(response);
    }

console.log(totalTax,'================================');



    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Adjust the number of items per page as needed
  
    const pageCount = Math.ceil(bookingData.length / itemsPerPage);
  
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>


  <div className='w-44 mt-4 '>
    <label htmlFor="">Total Tax</label>
      <div className='flex'>
               <input
                    onChange={handleChange}
                    name='totaltax'
                    type="text"
                    id="password"
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"
                    value={totalTax}
                    readOnly
                    required
                /> 
                <button onClick={handleSubmit} type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Set</button>
        </div>
    </div>



    {totdata.map((item,index)=>(

<div class="max-w-2xl mx-4 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-2xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white/90 shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden"></div>

    <div className='flex flex-col pl-[15%] text-xl'>
    <div className='flex'> 
         <div>Tax For The Date : </div>
            <h2>{item?.totaltax}</h2> 
        </div>
        <div className='flex'> 
            <div>Total Payed : </div>
            <h2>{item?.payed}</h2> 
        </div>
        <div className='flex'> 
            <div>Total Balance : </div>
            <h2>{item?.totaltax - item?.payed}</h2>
        </div>
        <div className='flex'> 
            <div>Date and Time : </div>
            <h2>{(new Date(item.date)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</h2>
        </div>
        <div className='flex'> 
            <div>Income Tax Sanction : </div>
            <h2>{item?.status}</h2>
        </div>
        <div>
            <li className='text-white'> </li>
        </div>
    </div>
</div>



))}



    </>
  )
}
export default AdminBookingTaxOneInst