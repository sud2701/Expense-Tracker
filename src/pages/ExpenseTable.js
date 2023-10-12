import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import ExpenseCard from '../components/ExpenseCard';
import NewExpensePopup from '../components/NewExpensePopup';
import ExpensePopup from '../components/ExpensePopup';

const expense_cats = ["Home", "Groceries", "Repair", "Food", "Education", "Clothing and Accessories", "Furniture", "Refreshment", "Health Care", "Miscellaneous"];

export const handleExpenseDelete = async (id) => {
    const res = await fetch('http://localhost:4000/expenses/' + id, {
        method: "DELETE"
    });
    if (res.ok) {
        console.log("Expense deleted successfully");
    }
    else {
        console.log("Unable to delete expense");
    }
}

const ExpenseTable = () => {
    const username = localStorage.getItem('username');
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 10;
    const [lifetime, setLifetime] = useState(0);
    const [monthly, setMonthly] = useState(0);
    const [nextActive, setNextActive] = useState(true);
    const [prevActive, setPrevActive] = useState(false);
    const percentage = 75;
    const radius = 64;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const handleExpenseClick = (expense) => {
        setSelectedExpense(expense);
    };

    const toggleAddExpense = () => {
        setIsAddingExpense(!isAddingExpense);
    };

    useEffect(() => {
        if (username === null) {
            navigate("/login", { replace: true });
        }
        const getAggregates = async () => {
            const lifetimeres = await fetch(`http://localhost:4000/life-expenses?username=${username}`);
            const lifetimedata = await lifetimeres.json();
            console.log(lifetimedata);
            if (lifetimeres.ok) {
                setLifetime(lifetimedata[0].total);
            }
            else {
                console.log("Unable to get your life time expenditure");
            }

            const monthlyres = await fetch(`http://localhost:4000/monthly-expense-aggregates?username=${username}`);
            const monthlydata = await monthlyres.json();
            console.log(monthlydata);
            if (monthlyres.ok) {
                if (monthlydata[0].total) {
                    setMonthly(monthlydata[0].total);
                }
            }
            else {
                console.log("Unable to get your monthly expenditure");
            }
        }
        getAggregates();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/expenses?username=${username}&page=${page}&limit=${limit}`);
                const data = await res.json();

                if (res.status === 200) {
                    setExpenses(data);
                    setNextActive(data.length === limit);
                    setPrevActive(page > 1);
                }
                else {
                    console.log("Error while fetching data");
                    setExpenses([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, [page]);

    const handleNextPage = () => {
        if (nextActive) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (prevActive) {
            setPage(page - 1);
        }

    };

    return (
        <div className="flex h-screen bg-gray-200">
            <NavBar />


            <div className="grid grid-cols-1 gap-0.5 w-full justify-items-center overflow-y-auto my-3">

                <div className="grid grid-cols-3 gap-6 justify-items-center place-items-center">
                    <div className="w-52 h-52 rounded-full shadow-lg border border-red-600 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 flex flex-col items-center justify-center">
                        <p className="text-xl font-bold my-4 text-white">Lifetime Expenses</p>
                        <p className="text-2xl font-bold text-white">${lifetime}</p>
                    </div>
                    <div className="w-64 h-64 relative rounded-lg bg-gray-400 shadow-lg">
                        <div className="w-full h-full absolute flex justify-center items-center transform -rotate-90">
                            <svg className="w-full h-full">
                                <circle
                                    r={radius}
                                    cx="50%"
                                    cy="50%"
                                    fill="transparent"
                                    stroke="#ccc"
                                    strokeWidth="10"
                                />
                                <circle
                                    r={radius}
                                    cx="50%"
                                    cy="50%"
                                    fill="transparent"
                                    stroke="#0077b6" // Change to your desired color
                                    strokeWidth="10"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                            {percentage}%
                        </div>
                    </div>
                </div>
                {/* className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-2xl text-blue-500" */}

                <button
                    onClick={toggleAddExpense}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4"
                >
                    Add New Expense
                </button>

                <p className="text-lg">Monthly Expenses: ${monthly}</p>
                {/* Pagination Controls */}
                <div className="my-4">
                    <button onClick={handlePrevPage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2">New Expenses</button>
                    <span className="text-gray-700">Page {page}</span>
                    <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2">Old Expenses</button>
                </div>
                {expenses !== null && expenses.map((expense) => (
                    <ExpenseCard key={expense._id} expense={expense} onClick={handleExpenseClick} />
                ))}
                <NewExpensePopup isAddingExpense={isAddingExpense} toggleAddExpense={toggleAddExpense} expense_cats={expense_cats} />
                <ExpensePopup selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} />


            </div>
        </div>
    );
};

export default ExpenseTable;
