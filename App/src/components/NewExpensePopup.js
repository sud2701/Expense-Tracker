// NewExpensePopup.js
import React from 'react';
import { useState } from 'react';
const NewExpensePopup = ({ isAddingExpense, toggleAddExpense, expense_cats }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async () => {
        if (title === "" || desc === "" || amount === undefined || category === "") {
            setError("Please select all the fields before adding");
            return;
        }
        const username = localStorage.getItem("username");
        const res = await fetch("http://localhost:4000/expenses", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ title, description: desc, amount, category, username: username })
        });
        if (res.ok) {
            setError(null);
            toggleAddExpense();
        }
        else {
            setError("Unable to add expense");
        }
    }
    if (!isAddingExpense) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white w-1/3 p-6 h-3/4 overflow-y-auto rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Expense</h2>
                <div className="mb-4">
                    <label className="block text-gray-600">Title</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Description</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter description"
                        value={desc}
                        onChange={(e) => { setDesc(e.target.value); }}
                    ></textarea>
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
                <div className="mb-4">
                    <label className="block text-gray-600">Category</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); }}
                    >
                        {expense_cats.map((expense, index) => {
                            return (
                                <option value={expense} key={index}>{expense}</option>
                            );
                        })}
                    </select>
                </div>
                <button
                    onClick={toggleAddExpense}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                    Add Expense
                </button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default NewExpensePopup;
