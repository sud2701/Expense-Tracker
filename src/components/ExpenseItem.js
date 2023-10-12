import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { formatDate } from '../utils/functions';
const ExpenseItem = ({ title, amount, date, category }) => {
    return (
        <div className="bg-red-100 p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-red-600">{title}</h2>
                    <p className="text-gray-500 text-sm">{formatDate(date)}</p>
                    <p className="text-gray-600">Category: {category}</p>
                </div>
                <div className="flex items-center">
                    <FaArrowDown className="text-red-600 mr-1" />
                    <p className="text-lg font-semibold text-red-600">${amount}</p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseItem;
