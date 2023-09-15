import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import IncomeCard from '../components/IncomeCard';
import NewIncomePopup from '../components/NewIncomePopup';
import IncomePopup from '../components/IncomePopup';

const IncomeTable = () => {
    const username = localStorage.getItem('username');
    const [incomes, setIncomes] = useState([]);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [isAddingIncome, setIsAddingIncome] = useState(false); // State to control the popup form
    const navigate = useNavigate();
    const page = 0;
    const limit = 25;

    const handleIncomeClick = (income) => {
        setSelectedIncome(income);
    };

    const toggleAddIncome = () => {
        setIsAddingIncome(!isAddingIncome);
    };

    useEffect(() => {
        if (username === null) {
            navigate("/login", { replace: true })
        }
        const getData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/incomes?username=${username}&page=${page}&limit=${limit}`);
                console.log(res);
                const data = await res.json();
                console.log(data);
                if (res.ok) {
                    if (data.length > 0)
                        setIncomes(data);
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
            <div className="grid grid-cols-1 w-full justify-items-center h-max">
                <button
                    onClick={toggleAddIncome}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4"
                >
                    Add New Income
                </button>
                {incomes && incomes.map((income) => (
                    <IncomeCard key={income._id} income={income} onClick={handleIncomeClick} />
                ))}
                <NewIncomePopup isAddingIncome={isAddingIncome} toggleAddIncome={toggleAddIncome} />
                <IncomePopup selectedIncome={selectedIncome} setSelectedIncome={setSelectedIncome} />
            </div>
        </div>
    );
};

export default IncomeTable;
