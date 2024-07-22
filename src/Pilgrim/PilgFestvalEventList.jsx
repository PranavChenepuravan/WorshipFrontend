import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const PilgFestivalEventList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4; // Adjust the number of items per page as needed
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://worshipbackend.onrender.com/institution/festevents/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = currentItems.filter(item =>
        item?.eventname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="overflow-x-auto">
            <label htmlFor="" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Search</label>
                <div className="flex pb-2">
                    <input
                        type="text"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[20%] h-[2%]"
                        placeholder="Search by Event Name"
                        onChange={handleSearchChange}
                        value={searchQuery}
                        required
                    />
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Photo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Starting Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ending Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td>{item?.eventname}</td>
                                <td>
                                    <img src={`https://worshipbackend.onrender.com/uploads/${item?.photo}`} alt="" />
                                </td>
                                <td>{item?.description}</td>
                                <td>{item?.date}</td>
                                <td>{item?.starttime}</td>
                                <td>{item?.endtime}</td>
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

export default PilgFestivalEventList;
