import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const PilgBookingInst = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 18; // Adjust the number of items per page as needed
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter data based on the search query
    const filteredData = data.filter(item =>
        item.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://worshipbackend.onrender.com/pilgrim/bookinginst`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle search input change
    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
        setCurrentPage(0); // Reset current page when search query changes
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="flex">
                   <Link to="/pilglayout/pilgbookinglist">
                       <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-[5%] ">
                         Booking List
                       </button>
                    </Link>
                    <Link to="/pilglayout/pilgdonationlistall">
                      <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-[5%] ">
                        Donation List
                      </button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <div className='flex'>
                    <label htmlFor="" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Search</label>
                    <div className='w-52'>
                    <input
                        type="text"
                        id="user_name"
                        className="mx-[20%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        required
                    />
                    </div>
                    </div>
                    {/* <button
                        type="button"
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2"
                    >
                        Search
                    </button> */}

                    <div className="flex flex-wrap gap-2 pt-2">
                        {currentItems.map(item => {
                            if (item.status === 'approved' && item.transaction === 'approved') {
                                return (
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
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                {item.location}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <div className="p-1 pt-0">
                                               <Link to={`/pilglayout/pilgbooking/${item._id}`}>
                                                <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-24 ml-1" type="button">
                                                    Visit
                                                </button>
                                                </Link>
                                            </div>
                                            <div className="p-1 pt-0">
                                               <Link to={`/pilglayout/pilgdonation/${item._id}`}>
                                                 <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-24" type="button">
                                                    Donate
                                                 </button>
                                                </Link>
                                            </div>
                                            <div className="p-1 pt-0">
                                               <Link to={`/pilglayout/pilgpreaching/${item._id}`}>
                                                 <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-3 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-24 mr-1" type="button">
                                                    Preaching
                                                 </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-1 pt-0 ml-[34%] mr-[30%]">
                                          <Link to={`/pilglayout/pilginstitutionheritage/${item._id}`}>
                                            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2 w-24">
                                                More
                                            </button>
                                          </Link>
                                        </div>
                                    </div>
                                );
                            } else {
                                return null; // If transaction is not 'approved', render nothing
                            }
                        })}
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

export default PilgBookingInst;
