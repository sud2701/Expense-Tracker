// ExpensePopup.js
import React from 'react';
import { formatDate } from '../utils/functions';
const IncomePopup = ({ selectedIncome, setSelectedIncome }) => {
    if (!selectedIncome) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white w-2/3 p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedIncome.source}</h2>
                <div className="text-gray-600 mb-4">
                    <p className="mb-2">Date: {formatDate(selectedIncome.date_recorded)}</p>
                    <p className="mb-2">Amount: ${selectedIncome.amount}</p>
                </div>
                <button
                    onClick={() => setSelectedIncome(null)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default IncomePopup;
