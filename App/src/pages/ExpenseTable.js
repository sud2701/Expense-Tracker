import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import ExpenseCard from '../components/ExpenseCard';
import NewExpensePopup from '../components/NewExpensePopup';
import ExpensePopup from '../components/ExpensePopup';

const expense_cats = ["Home", "Groceries", "Repair", "Food", "Education", "Clothing and Accessories", "Furniture", "Refreshment", "Health Care", "Miscellaneous"];

const ExpenseTable = () => {
    const username = localStorage.getItem('username');
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false); // State to control the popup form
    const navigate = useNavigate();
    const page = 0;
    const limit = 25;

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
        const getData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/expenses?username=${username}&page=${page}&limit=${limit}`);
                console.log(res);
                const data = await res.json();
                console.log(data);
                if (res.ok) {
                    if (data.length > 0)
                        setExpenses(data);
                } else {
                    console.log("Error while fetching data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [username, navigate]);

    return (
        <div className="flex h-screen bg-gray-200">
            <NavBar />
            <div className="grid grid-cols-1 w-full justify-items-center overflow-y-auto">
                <button
                    onClick={toggleAddExpense}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4"
                >
                    Add New Expense
                </button>
                {expenses && expenses.map((expense) => (
                    <ExpenseCard key={expense._id} expense={expense} onClick={handleExpenseClick} />
                ))}
                <NewExpensePopup isAddingExpense={isAddingExpense} toggleAddExpense={toggleAddExpense} expense_cats={expense_cats} />
                <ExpensePopup selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} />
            </div>
        </div>
    );
};

export default ExpenseTable;
