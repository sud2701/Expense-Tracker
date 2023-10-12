import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { formatDate } from '../utils/functions';
const IncomeItem = ({ source, amount, date }) => {
    return (
        <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-green-600">{source}</h2>
                    <p className="text-gray-500 text-sm">{formatDate(date)}</p>
                </div>
                <div className="flex items-center">
                    <FaArrowUp className="text-green-600 mr-1" />
                    <p className="text-lg font-semibold text-green-600">${amount}</p>
                </div>
            </div>
        </div>
    );
};

export default IncomeItem;
