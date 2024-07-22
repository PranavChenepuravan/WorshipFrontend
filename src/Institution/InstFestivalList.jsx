import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

export const InstFestivalList = () => {
    let id = localStorage.getItem('id');
    const [data, setData] = useState(['']);
    const [refresh, setRefresh] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Adjust the number of items per page as needed

    useEffect(() => {
        let fetchdata = async () => {
            let response = await axios.get(`https://worshipbackend.onrender.com/institution/festival/${id}`);
            console.log(response.data);
            setData(response.data);
        };
        fetchdata();
    }, [refresh]);

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Filter data based on festival name
    const filteredData = currentItems.filter(item =>
        item?.festival?.festivalname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="overflow-x-auto">
                {/* Search input */}
                <div className='flex items-center mb-4'>
                    <input
                        type="text"
                        placeholder="Search by festival name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Festival Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Picture
                            </th>
                            <th scope="col" className="px-6 py-3">
                                About
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Starting Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ending Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td>{item?.festival?.festivalname}</td>
                                <td><img src={`https://worshipbackend.onrender.com/uploads/${item.festival?.photo}`} alt="" /></td>
                                <td>{item?.festival?.about}</td>
                                <td>{item?.festival?.startingdate}</td>
                                <td>{item?.festival?.endingdate}</td>
                                <td>
                                    <Link to={`/instlayout/instfestivalevents/${item?.festival?._id}`}>
                                     <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                        Events
                                     </button>
                                    </Link>
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
            </div>
        </>
    );
};
export default InstFestivalList;
