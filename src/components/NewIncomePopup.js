// NewExpensePopup.js
import React from 'react';
import { useState } from 'react';
const NewIncomePopup = ({ isAddingIncome, toggleAddIncome }) => {
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState();
    const [error, setError] = useState("");
    const handleSubmit = async () => {
        if (source === "" || amount === undefined) {
            setError("Please select all the fields before adding");
            return;
        }
        const username = localStorage.getItem("username");
        const res = await fetch("http://localhost:4000/incomes", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ source, amount, username: username })
        });
        if (res.ok) {
            setError(null);
            toggleAddIncome();
        }
        else {
            setError("Unable to add income");
        }
    }
    if (!isAddingIncome) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white w-1/3 p-6 h-3/4 overflow-y-auto rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Income</h2>
                <div className="mb-4">
                    <label className="block text-gray-600">Source</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter title"
                        value={source}
                        onChange={(e) => { setSource(e.target.value); }}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value); }}
                    />
                </div>

                <button
                    onClick={toggleAddIncome}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                    Add Income
                </button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default NewIncomePopup;
