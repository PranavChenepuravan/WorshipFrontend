import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const InstDaily = () => {

    const [data, setData] = useState({ income: '', expense: '', amount: '' });
    const id = localStorage.getItem('id');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });

        if (name === 'income' || name === 'expense') {
            const income = parseFloat(name === 'income' ? value : data.income);
            const expense = parseFloat(name === 'expense' ? value : data.expense);
            const amount = (income - expense).toString();
            setData(prevState => ({ ...prevState, amount }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(data);

        try {
            const response = await axios.post('https://worshipbackend.onrender.com/institution/dailyincome', {
                ...data,
                institutionId: id,
                date: formattedDate
            });
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                    <div className='flex flex-col pl-[5%] pr-[5%] text-xl'>
                        <div className="flex pt-8">
                            <label htmlFor="date" className="w-[20%]">Date : </label>
                            <input
                                onChange={handleChange}
                                name='date'
                                type="date"
                                id="date"
                                className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={formattedDate}
                                min={formattedDate}
                                max={formattedDate}
                                required
                            />
                        </div>
                        <div className='flex pt-8'>
                            <label htmlFor="income" className="w-[20%]">Income :</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="income"
                                id="income"
                                className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className='flex pt-8'>
                            <label htmlFor="expense" className="w-[20%]">Expense :</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="expense"
                                id="expense"
                                className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className='flex pt-8'>
                            <label htmlFor="amount" className="w-[20%]">Amount :</label>
                            <input
                                value={data.amount}
                                readOnly
                                type="text"
                                name="amount"
                                id="amount"
                                className="ml-[10%] w-[70%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className='pl-[30%] flex'>
                        <li className='text-white'> </li>
                        <Link to='/instlayout'><button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 w-28">Cancel</button></Link>
                        <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 w-28">Save</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default InstDaily;
