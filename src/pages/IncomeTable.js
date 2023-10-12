import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import IncomeCard from '../components/IncomeCard';
import NewIncomePopup from '../components/NewIncomePopup';
import IncomePopup from '../components/IncomePopup';

export const handleIncomeDelete = async (id) => {
    const res = await fetch('http://localhost:4000/incomes/' + id, {
        method: "DELETE"
    });
    if (res.ok) {
        console.log("Income deleted successfully");
    }
    else {
        console.log("Unable to delete income");
    }
}


const IncomeTable = () => {
    const username = localStorage.getItem('username');
    const [incomes, setIncomes] = useState([]);
    const [selectedIncome, setSelectedIncome] = useState(null);
    const [isAddingIncome, setIsAddingIncome] = useState(false); // State to control the popup form
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 10;
    const [lifetime, setLifetime] = useState(0);
    const [monthly, setMonthly] = useState(0);
    const [nextActive, setNextActive] = useState(true);
    const [prevActive, setPrevActive] = useState(false);
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
        const getAggregates = async () => {
            const lifetimeres = await fetch(`http://localhost:4000/life-incomes?username=${username}`);
            const lifetimedata = await lifetimeres.json();
            console.log(lifetimedata);
            if (lifetimeres.ok) {
                setLifetime(lifetimedata[0].total);
            }
            else {
                console.log("Unable to get your life time income");
            }

            const monthlyres = await fetch(`http://localhost:4000/monthly-income-aggregates?username=${username}`);
            const monthlydata = await monthlyres.json();
            console.log(monthlydata);
            if (monthlyres.ok) {
                if (monthlydata[0].total) {
                    setMonthly(monthlydata[0].total);
                }
            }
            else {
                console.log("Unable to get your monthly income");
            }
        }
        getAggregates();
    }, [])

    useEffect(() => {

        const getData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/incomes?username=${username}&page=${page}&limit=${limit}`);
                console.log(res);
                const data = await res.json();
                console.log(data);
                if (res.ok) {
                    if (data.length > 0) {
                        setIncomes(data);
                        setNextActive(data.length === limit);
                        setPrevActive(page > 1);
                    }
                } else {
                    console.log("Error while fetching data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [username, navigate]);

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
            <div className="grid grid-cols-1 w-full h-min gap-0.5 justify-items-center overflow-y-auto">
                <button
                    onClick={toggleAddIncome}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4"
                >
                    Add New Income
                </button>
                <p className="text-lg">Lifetime Incomes: ${lifetime}</p>
                <p className="text-lg">Monthly Incomes: ${monthly}</p>
                {/* Pagination Controls */}
                <div className="my-4">
                    <button onClick={handlePrevPage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2">Newer Incomes</button>
                    <span className="text-gray-700">Page {page}</span>
                    <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2">Older Incomes</button>
                </div>
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
