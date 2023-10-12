// ExpensePopup.js
import React from 'react';
import { formatDate } from '../utils/functions';
const ExpensePopup = ({ selectedExpense, setSelectedExpense }) => {
    if (!selectedExpense) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white w-2/3 p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedExpense.title}</h2>
                <div className="text-gray-600 mb-4">
                    <p className="mb-2">Date: {formatDate(selectedExpense.date_recorded)}</p>
                    <p className="mb-2">Amount: ${selectedExpense.amount}</p>
                    <p>Category: {selectedExpense.category}</p>
                </div>
                <p className="text-gray-700 mb-4">{selectedExpense.description}</p>
                <button
                    onClick={() => setSelectedExpense(null)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ExpensePopup;
