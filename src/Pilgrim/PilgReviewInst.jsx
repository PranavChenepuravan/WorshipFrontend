import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const PilgReviewInst = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredData = data.filter(item =>
        item.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://worshipbackend.onrender.com/pilgrim/reviewinst');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        setCurrentPage(0); // Reset current page when search query changes
    };

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className='flex'>
                    <label htmlFor="" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Search</label>
                    <div className='w-52'>
                    <input
                        type="text"
                        id="user_name"
                        className="mx-[20%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by institution name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        required
                    />
                     </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {currentItems.map(item => (
                            <div key={item._id} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
                                <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                    <img src={`https://worshipbackend.onrender.com/uploads/${item.photo}`} alt="card-image" />
                                </div>
                                <div className="p-6">
                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {item.institutionName}
                                    </h5>
                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                        {item.insttype}
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="p-6 pt-0">
                                       <Link to={`/pilglayout/pilgreviewadd/${item._id}`}>
                                        <button
                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                            type="button"
                                        >
                                            Review
                                        </button>
                                        </Link>
                                    </div>
                                    <div className="p-6 pt-0"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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

export default PilgReviewInst;
