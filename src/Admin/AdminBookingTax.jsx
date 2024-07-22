import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AdminBookingTax = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 7;

    let id = localStorage.getItem('id');

    const [bookingData, setBookingData] = useState([]);
    const [rating, setRating] = useState();
    const [data, setData] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let fetchData = async () => {
            let response = await axios.get('https://worshipbackend.onrender.com/admin/booking');
            setBookingData(response.data);
            console.log(response);
        };
        fetchData();
    }, [refresh]);

    console.log(data, 'taxxxx');

    let handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        console.log('sad');
        let response = await axios.put('https://worshipbackend.onrender.com/admin/bookingtax', data);
    };

    const pageCount = Math.ceil(bookingData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="overflow-x-auto ">
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 font-medium text-white dark:text-white text-2xl">Tax % </label>
                    <div className='flex'>
                        <input type="text" onChange={handleChange} id="password" name="tax" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[25%]" required />
                        <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update</button>
                    </div>
                </div>
            </form>
            {currentItems.length > 0 && currentItems[0]?.currentPercentage &&
                <div className="text-white flex text-2xl">
                    <label htmlFor="password" className="block mb-2 font-medium text-white dark:text-white ">Current Tax : </label>
                    {currentItems[0].currentPercentage}
                    <p>%</p>
                </div>
            }
            <Link to='/admin/adminbookingtaxinstwise'>
             <button type="button" class="mx-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Institution Wise</button> 
            </Link>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            InstType
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Institution Address
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Pilgrim Id
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            Date
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
                    {currentItems.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                            <td className="px-6 py-4">{item?.institutionInfo[0]?.insttype}</td>
                            <td className="px-6 py-4">{item?.institutionInfo[0]?.institutionName},{item?.institutionInfo[0]?.location},{item?.institutionInfo[0]?.email},{item?.institutionInfo[0]?.phone}</td>
                            {/* <td className="px-6 py-4">{item?.pilgrimId}</td> */}
                            <td className="px-6 py-4">{ new Date(item?.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{item?.amount}</td>
                            <td className="px-6 py-4">{item?.tax}</td>
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

export default AdminBookingTax;
