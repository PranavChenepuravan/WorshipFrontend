import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export const PilgPhotos = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Filtering data based on search query
    const filteredData = data.filter(item =>
        item.institutions?.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://worshipbackend.onrender.com/pilgrim/picture/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="mb-5 flex">
            <label htmlFor="" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Search : </label>
                <input
                    type="text"
                    id="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by institution name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <Link to="/pilglayout/pilgphotosadd">
            <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 mx-[2%]">
                Add
            </button>
            </Link>

            <div className="flex flex-wrap gap-4 justify-center">
                {currentItems.map((item, index) => (
                    <div key={index} className="h-[20%] bg-gray-100 flex items-center text-center">
                        <div className="container mx-auto p-9 bg-white max-w-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                            <img src={`https://worshipbackend.onrender.com/uploads/${item.Picture?.photo}`} className="w-48 h-48" alt="" />
                            <div className="justify-between items-center">
                                <div>
                                    <h1 className="mt-5 mb-3 text-2xl font-semibold">{item.institutions?.institutionName}</h1>
                                    <p>By</p>
                                    <h1 className="mt-2 text-2xl font-semibold">{item.pilgrims?.name}</h1>
                                    <h1 className="mt-2 text-2xl font-semibold">{item.pilgrims?.email}</h1>
                                    <p className="mt-1"> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

export default PilgPhotos;
