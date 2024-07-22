import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const InstDonationTax = () => {
    const id = localStorage.getItem('id');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data4, setData4] = useState([]);
    const [data3, setData3] = useState('');
    const [refresh, setRefresh] = useState('');

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response, response1, response2,response4] = await Promise.all([
                    axios.get(`https://worshipbackend.onrender.com/institution/donation/${id}`),
                    axios.get(`https://worshipbackend.onrender.com/institution/pilgdonation3/${id}`),
                    axios.get(`https://worshipbackend.onrender.com/institution/propertieinst/${id}`),
                    axios.get(`https://worshipbackend.onrender.com/institution/dailyincome/${id}`)
                ]);
                setData(response.data);
                setData1(response1.data);
                setData2(response2.data);
                setData4(response4.data);
                console.log(response4)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id, refresh]);

    // Calculate sum of all incomes
    const incomeSum = data2.reduce((acc, item) => {
        let sum = 0;
        for (let i = 1; i <= 4; i++) {
            sum += item[`income${i}`];
        }
        return acc + sum;
    }, 0);

    // Calculate sum of amounts
    const amountSum = data.reduce((acc, item) => acc + (item.donation ? item.donation.amount : 0), 0);

    // Calculate sum of worth
    const worthSum = data1.reduce((acc, item) => acc + item.amount, 0);

    const dailySum = data4.reduce((acc, item) => acc + item.amount, 0)

    // Calculate total sum
    const totalSum =  amountSum + worthSum + dailySum;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare data to be sent to backend
        const postData = {
            // incomeSum,
            amountSum,
            worthSum,
            dailySum,
            totalSum,
            id,
            date: formattedDate
            // Add any additional data needed
        };

        try {
            const response = await axios.post('https://worshipbackend.onrender.com/institution/wholedonation', postData);
            console.log(response);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <>
            <Link to='/instlayout/instdonationwholetax'><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Total</button></Link>
            <p className='text-white text-xl'>Properties</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Property 1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Income1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Property 2
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Income2
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Property 3
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Income3
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Property 4
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Income4
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data2.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td>{item?.property1}</td>
                            <td>{item?.income1}</td>
                            <td>{item?.property2}</td>
                            <td>{item?.income2}</td>
                            <td>{item?.property3}</td>
                            <td>{item?.income3}</td>
                            <td>{item?.property4}</td>
                            <td>{item?.income4}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className='text-white text-xl pt-2'>Offline</p>

            {/* <div className='flex'>
        <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">Search</button>
        <input  type="text" name='time' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[20%] h-[2%]" required />
      </div> */}


            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
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
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Other Details
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map((item,index)=>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>
                        {item.donation ? item.donation.name : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.place : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.phone : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.email : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.date : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.time : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.category : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.other : "Donation data not avialable"}
                    </td>
                    <td>
                        {item.donation ? item.donation.amount : "Donation data not avialable"}
                    </td>

                </tr>
            ))}
            
        </tbody>
    </table>








            
            <p className='text-white text-xl mt-2'>Online</p>
            {/* <div className='flex'>
        <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">Search</button>
        <input  type="text" name='time' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[20%] h-[2%]" required />
      </div> */}

    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    weight
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            {data1.map((item,index)=>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>{item?.pilgInfo?.name}</td>
                    <td>{item?.pilgInfo?.location},{item?.pilgInfo?.phone},{item?.pilgInfo?.email}</td>
                    <td>{item?.donInfo?.date}</td>
                    <td>{item?.donInfo?.time}</td>
                    
                    <td>{item?.donInfo?.material}</td>
                    <td>{item?.donInfo?.size}</td>
                    <td>{item?.donInfo?.weight}</td>
                    <td>{item?.donInfo?.amount}</td>

                </tr>
            ))}
            
        </tbody>
    </table>

    <p className='text-white text-xl mt-2'>Daily Income</p>
            {/* <div className='flex'>
        <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">Search</button>
        <input  type="text" name='time' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[20%] h-[2%]" required />
      </div> */}

    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            {data4.map((item,index)=>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>{item.date}</td>
                    <td>{item.amount}</td>

                </tr>
            ))}
            
        </tbody>
    </table>

        </>
    );
};

export default InstDonationTax;
