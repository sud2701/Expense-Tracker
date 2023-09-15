import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:order-2">
                    <img
                        src="Sample 2.png"
                        alt="Animation"
                        className="h-auto w-full object-cover rounded-lg shadow-lg md:max-h-80"
                    />
                </div>
                <div className="md:order-1 md:flex md:flex-col md:justify-center">
                    <h2 className="text-red-700 text-4xl font-bold mb-4">Expense Tracker</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Manage your finances effortlessly with our intuitive Expense Tracker.
                        Stay ahead of your income, expenditures, and more.
                    </p>
                    <Link
                        to="/login"
                        className="block w-full md:w-auto px-6 py-3 text-center text-white bg-red-700 font-bold rounded-lg shadow-lg hover:bg-red-800 focus:outline-none mb-4"
                    >
                        Sign In
                    </Link>
                    <p className="text-gray-500 text-sm">
                        Explore the features:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Track your income and expenses</li>
                        <li>Create budget goals</li>
                        <li>Analyze spending patterns</li>
                        <li>Visualize your financial data</li>
                    </ul>
                    <p className="mt-6 text-gray-500 text-sm">
                        Join our community now and take control of your finances.
                    </p>
                    <div className="mt-4">
                        <Link
                            to="/signup"
                            className="inline-block px-6 py-3 text-center text-white bg-green-500 font-bold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
