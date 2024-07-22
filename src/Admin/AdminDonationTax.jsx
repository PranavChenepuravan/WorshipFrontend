import React,{ useState,useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AdminDonationTax = () => {
    const [currentPage, setCurrentPage] = useState(0);
      const itemsPerPage = 7; // Adjust the number of items per page as needed

      let id=localStorage.getItem('id')

      const [data,setData]=useState([''])
      const [data1,setData1]=useState([''])
      const [refresh,setrefresh]=useState(false)


      useEffect(()=>{
        let fetchdata=async ()=>{
          let response=await axios.get('https://worshipbackend.onrender.com/admin/wholedonation2')
          console.log(response.data);
          setData(response.data)

        }
        fetchdata()
      },[refresh])

      let handleChange = (event) =>{
        setData1({...data1, [event.target.name]: event.target.value });
      };

      let handleSubmit = async (event) => {
        console.log('in submit');
        event.preventDefault();
        console.log('sad');
        let response = await axios.put('https://worshipbackend.onrender.com/admin/wholedonationtax', data1);
        console.log(response);
    };




      const pageCount = Math.ceil(data.length / itemsPerPage);


      const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    
      const indexOfLastItem = (currentPage + 1) * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    

<div className="overflow-x-auto  ">
<form action="" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label for="password" className="block mb-2 font-medium text-white dark:text-white text-2xl">Tax % </label>
    <div className='flex'>
    <input type="text" id="password" onChange={handleChange} name="tax"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[25%]" required />
    <button type="submit"  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update</button>
    </div>
  </div>
  </form>

  {currentItems.length > 0 && currentItems[0]?.currentPercentage &&

  <div className="text-white flex text-2xl">
                    <label htmlFor="password" className="block mb-2 font-medium text-white dark:text-white ">Current Tax : </label>
                    {currentItems[currentItems.length-1]?.currentPercentage}
                    <p>%</p>
 </div>
 }

<button type="button" class="mx-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link to='/admin/admindonationtaxinstwise'>Institution Wise</Link></button> 
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
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                   Total Amount
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
          {currentItems.map((item, index) => (
            // <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            //   <td className="px-6 py-4">{item?.instInfo?.insttype}</td>
            //   <td className="px-6 py-4">{item?.instInfo?.institutionName},{item?.instInfo?.location},{item?.instInfo?.phone},{item?.instInfo?.email}</td>
            //   <td className="px-6 py-4">{item?.donations?.date}</td>
            //   <td className="px-6 py-4">{item?.donations?.totalSum}</td>
            //   <td className="px-6 py-4">{item?.donations?.tax}</td>
            //   <td>
            //     {isNaN(item?.donations?.tax - item?.donations?.balance) 
            //         ? '' 
            //         : item?.donations?.tax - item?.donations?.balance
            //     }
            // </td>
            //   <td className="px-6 py-4">{item?.donations?.status}</td>
            //   <td className="px-6 py-4"></td>
            // </tr>


            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{item?.instInfo?.[0]?.insttype}</td>
            <td className="px-6 py-4">
            {item?.instInfo?.[0]?.institutionName
                  ? `${item.instInfo[0].institutionName}, ${item.instInfo[0].location}, ${item.instInfo[0].phone}, ${item.instInfo[0].email}`
                  : '-'
                }

            </td>
            <td className="px-6 py-4">{formatDate(item?.date)}</td>
            <td className="px-6 py-4">{item?.totalSum}</td>
            <td className="px-6 py-4">{item?.tax || '-'}</td>
              <td className="px-6 py-4">{(item?.tax - item?.balance) || '-'}</td>
              <td className="px-6 py-4">{item?.balance || '-'}</td>
              <td className="px-6 py-4">{item?.status || '-'}</td>
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

  )
}
export default AdminDonationTax
