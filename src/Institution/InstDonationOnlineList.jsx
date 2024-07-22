import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const InstDonationOnlineList = () => {
    const id = localStorage.getItem('id');
    const [data, setData] = useState([]);
    const [paydata, setPayData] = useState([]);
    const [refresh, setRefresh] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Limit of rows per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://worshipbackend.onrender.com/institution/pilgdonation3/${id}`);
                setData(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [refresh]);

    const handleChange = (event) => {
        setPayData({ ...paydata, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (statuss, itemId) => {
        setRefresh(!refresh);
        let response = await axios.put(`https://worshipbackend.onrender.com/institution/pilgdonation/${itemId}`, { status: statuss });
        console.log(response);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table header */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Pilgrim
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Material
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Weight
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th></th>
                    </tr>
                </thead>
                {/* Table body with paginated data */}
                <tbody>
                    {currentItems.map((item, index) => (
                        item.donInfo.status !== 'approved' && (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td>{item?.pilgInfo?.name}</td>
                            <td>{item?.pilgInfo?.location},{item?.pilgInfo?.phone},{item?.pilgInfo?.email}</td>
                            <td>{item?.donInfo?.date}</td>
                            <td>{item?.donInfo?.time}</td>      
                            <td>{item?.donInfo?.material}</td>
                            <td>{item?.donInfo?.size}</td>
                            <td>{item?.donInfo?.weight}</td>
                            <td>{item?.donInfo?.amount}</td>
                            <td>
                                <button
                                    onClick={() => handleSubmit('approved', item.donInfo._id)}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleSubmit('rejected', item.donInfo._id)}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="mt-4 flex justify-center">
                {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 mx-1 rounded-lg focus:outline-none ${
                            currentPage === index + 1
                                ? 'bg-gray-400 text-white'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default InstDonationOnlineList;
