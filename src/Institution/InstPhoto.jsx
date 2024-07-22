import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const InstPhoto = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items per page

    let id = localStorage.getItem('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`https://worshipbackend.onrender.com/institution/picture/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id, refresh]);

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = async (statuss, itemId) => {
        try {
            await axios.put(`https://worshipbackend.onrender.com/institution/picture/${itemId}`, { status: statuss });
            setData((prevData) =>
                prevData.map((item) =>
                    item.photos._id === itemId ? { ...item, photos: { ...item.photos, status: statuss } } : item
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredData = data.filter(
        (item) =>
            item.pilgrims?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pilgrims?.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="mb-5 flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Search by name or email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                {currentItems.map((item, index) => (
                    <div key={index} className="h-[20%] bg-gray-100 flex items-center text-center">
                        <div className="container mx-auto p-9 bg-white max-w-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                            <img src={`https://worshipbackend.onrender.com/uploads/${item?.photos?.photo}`} className="w-48 h-48" alt="" />
                            <span>{item?.photos?.status}</span>
                            <div className="justify-between items-center">
                                <div>
                                    <h1 className="mt-5 text-m font-semibold">{item?.pilgrims?.name}</h1>
                                    <h1 className="mt-5 text-m font-semibold">{item?.pilgrims?.email}</h1>
                                    <div className="pt-5">
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 w-[45%]"
                                            onClick={() => handleSubmit('approved', item.photos._id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[45%]"
                                            onClick={() => handleSubmit('reject', item.photos._id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                    <p className="mt-2"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="mt-4 flex justify-center">
                {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
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

export default InstPhoto;
