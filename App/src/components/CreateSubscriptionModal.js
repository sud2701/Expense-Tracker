// CreateSubscriptionModal.js
import React, { useState } from 'react';

const CreateSubscriptionModal = ({ isOpen, onClose }) => {
    const username = localStorage.getItem('username');
    const categories = ['Week', 'Month', 'Year']
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        beginDate: '',
        expirationDate: '',
        repeats: 'Month',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to handle the submission of a new subscription
        // You can send the formData to an API or update the state
        // Close the modal after successful submission
        const res = await fetch("http://localhost:4000/subscriptions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, amount: formData.amount, name: formData.name, begins_On: formData.beginDate, expires_On: formData.expirationDate, repeats: formData.repeats })
        });

        if (res.ok) {
            console.log("Subscription Added Successfully");
        }
        else {
            console.log('Unable to add subscription');
        }
        onClose();
    };

    return (
        // Render your subscription creation form here with inputs and submit button
        <>
            {isOpen && <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
                <div className="bg-white w-1/3 p-6 h-3/4 overflow-y-auto rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Subscription</h2>
                    <div className="mb-4">
                        <label className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Sub Name"
                            name="name"
                            onChange={handleInputChange}
                        />
                    </div>

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
                        <label className="block text-gray-600">Repeats</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            name="repeats"
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
                        <label className="block text-gray-600">Begin Date:</label>
                        <input
                            type="date"
                            name="beginDate"

                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">End Date:</label>
                        <input
                            type="date"
                            name="expirationDate"

                            onChange={handleInputChange}
                        />
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
                        Add Subscription
                    </button>
                </div>
            </div>}
        </>
    );
};

export default CreateSubscriptionModal;
