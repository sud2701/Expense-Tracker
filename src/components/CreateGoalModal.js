// CreateGoalModal.js
import React, { useState } from 'react';
import { getNextHalfYear, getStartAndEndDate } from '../utils/functions';

const CreateGoalModal = ({ isOpen, onClose }) => {
    const categories = ['Income', 'Expense', 'Subscription'];
    const username = localStorage.getItem('username');
    const months = getNextHalfYear();
    const [formData, setFormData] = useState({
        amount: '',
        category: 'Income',
        beginDate: '',
        expirationDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleMonth = (e) => {
        const { value } = e.target;
        const [startdate, enddate] = getStartAndEndDate(value);
        console.log(startdate);
        console.log(enddate);
        setFormData({
            ...formData,
            beginDate: startdate,
            expirationDate: enddate
        });
        console.log(formData.beginDate);
        console.log(formData.expirationDate);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/goals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, amount: formData.amount, category: formData.category, begins_On: formData.beginDate, expires_On: formData.expirationDate })
        });

        if (res.ok) {
            console.log("Goal Added Successfully");
        }
        else {
            console.log('Unable to add goal');
        }
        onClose();
    };

    return (
        // Render your goal creation form here with inputs and submit button
        <>
            {isOpen && <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
                <div className="bg-white w-1/3 p-6 h-3/4 overflow-y-auto rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Goal</h2>


                    <div className="mb-4">
                        <label className="block text-gray-600">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter amount"
                            name='amount'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Category</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            name="category"
                            onChange={handleInputChange}
                        >

                            {categories.map((expense, index) => {
                                return (
                                    <option value={expense} key={index}>{expense}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Concerned Period</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            name="month"
                            onChange={handleMonth}
                        >
                            <option key={-1}>Select Month</option>
                            {months.map((expense, index) => {
                                return (
                                    <option value={expense} key={index}>{expense}</option>
                                );
                            })}
                        </select>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Add Goal
                    </button>
                </div>
            </div>}
        </>
    );
};

export default CreateGoalModal;
