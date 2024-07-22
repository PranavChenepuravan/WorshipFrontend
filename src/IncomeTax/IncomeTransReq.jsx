import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const IncomeTransReq = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Adjust the number of items per page as needed

    let id = localStorage.getItem('id')

    const [data, setUserData] = useState([''])
    const [data1, setUserData1] = useState([''])
    const [refresh, setrefresh] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let fetchdata = async () => {
            let response1 = await axios.get(`https://worshipbackend.onrender.com/pilgrim/viewprofile/${id}`)
            console.log(response1.data);
            setUserData1(response1.data)

            let location = response1.data.location;
            console.log(location)
            if (location) {
                let response = await axios.get(`https://worshipbackend.onrender.com/admin/viewinstprofile/${location}`)
                console.log(response.data);
                setUserData(response.data)
            }
        }
        fetchdata()
    }, [refresh])

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Filter data based on institution name
    const filteredData = currentItems.filter(item =>
        item && item.institutionName && item.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="overflow-x-auto  ">
            {/* Search input */}
            <input
                type="text"
                placeholder="Search by institution name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Place
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Head
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Community
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Photo
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((item, index) => {
                        if (item && item.transaction !== 'approved') {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{item.institutionName}</td>
                                    <td className="px-6 py-4">{item.insttype}</td>
                                    <td className="px-6 py-4">{item.location}</td>
                                    <td className="px-6 py-4">{item.phone}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.community}</td>
                                    <td className="px-6 py-9 mb-2"><div className='w-28 h-20'><img src={`https://worshipbackend.onrender.com/uploads/${item.photo}`} alt="" /></div></td>
                                    <div className='flex'>
                                        <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link to={`/incomelayout/incometaxinstdetailpage/${item._id}`}>View</Link></button>
                                    </div>
                                </tr>
                            );
                        } else {
                            return null; // If the transaction is approved, don't render this row
                        }
                    })}
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
export default IncomeTransReq
