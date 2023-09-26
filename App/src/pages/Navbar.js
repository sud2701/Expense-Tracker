import React from 'react';
import { useEffect, useState } from 'react';
const NavBar = () => {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    // const [firstname, setfirstname] = useState("");
    // const [lastname, setlastname] = useState("");


    useEffect(() => {
        setusername(localStorage.getItem('username'));
        setemail(localStorage.getItem('email'));
        // setfirstname(localStorage.getItem('firstname'));
        // setlastname(localStorage.getItem('lastname'));
    }, [])
    return (

        <div className="bg-blue-600 text-white w-1/6 p-4 overflow-hidden">
            {/* User Profile Section */}
            <div className="flex items-center mb-6">
                <img
                    src="/path-to-profile-image.jpg" // Replace with the actual image path
                    alt="User Profile"
                    className="w-12 h-12 rounded-full mr-2"
                />
                <div>
                    <p className="text-lg font-semibold">{username}</p>
                    <p className="text-xs">{email}</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul>
                    <li className="mb-2">
                        <a
                            href="/main/dashboard"
                            className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {/* Replace with the icon for Dashboard */}
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a2 2 0 012-2h3a1 1 0 010 2H4v11a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 012 0v3a4 4 0 01-4 4H6a4 4 0 01-4-4V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Dashboard
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="/main/expenses"
                            className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {/* Replace with the icon for Dashboard */}
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a2 2 0 012-2h3a1 1 0 010 2H4v11a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 012 0v3a4 4 0 01-4 4H6a4 4 0 01-4-4V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Expenses
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="/main/incomes"
                            className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {/* Replace with the icon for Dashboard */}
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a2 2 0 012-2h3a1 1 0 010 2H4v11a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 012 0v3a4 4 0 01-4 4H6a4 4 0 01-4-4V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Incomes
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="/main/settings"
                            className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {/* Replace with the icon for Dashboard */}
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a2 2 0 012-2h3a1 1 0 010 2H4v11a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 012 0v3a4 4 0 01-4 4H6a4 4 0 01-4-4V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Settings
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="/main/goalsandsubs"
                            className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {/* Replace with the icon for Dashboard */}
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a2 2 0 012-2h3a1 1 0 010 2H4v11a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 012 0v3a4 4 0 01-4 4H6a4 4 0 01-4-4V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Goals and Subscriptions
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="/logout"
                            className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {/* Replace with the icon for Dashboard */}
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a2 2 0 012-2h3a1 1 0 010 2H4v11a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 012 0v3a4 4 0 01-4 4H6a4 4 0 01-4-4V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Logout
                        </a>
                    </li>
                    {/* Repeat the above <li> block for other navigation links */}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
