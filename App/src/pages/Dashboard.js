import { useState, useEffect } from "react";
import FinanceCard from '../components/FinanceCard';
import ExpenseItem from '../components/ExpenseItem';
import IncomeItem from '../components/IncomeItem';
import GoalCard from '../components/GoalCard';
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
const Dashboard = () => {
    const expensesAmount = 1500;
    const expensesPercentageChange = -10; // Negative for decrease
    const incomesAmount = 2500;
    const incomesPercentageChange = 15;
    const username = localStorage.getItem('username');
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const page = 0;
    const limit = 10;
    const navigate = useNavigate();
    useEffect(() => {
        if (username === null) {
            navigate("/login", { replace: true });
        } else {
            console.log(username);
            const getData = async (url, setData) => {
                const uri = `${url}?username=${username}&page=${page}&limit=${limit}`;
                try {
                    const res = await fetch(uri);
                    console.log(res);
                    const data = await res.json();
                    console.log(data);
                    if (res.ok) {
                        if (data.length > 0)
                            setData(data);
                    } else {
                        console.log("Error while fetching data");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            getData("http://localhost:4000/expenses", setExpenses);
            getData("http://localhost:4000/incomes", setIncomes);
        }

    }, [username, navigate]);


    return (
        <div className="flex h-screen bg-gray-200">
            <NavBar />
            <div className="flex-1 p-6 overflow-y-auto">
                {/* Chart Section */}


                <div className="flex justify-center mx-2 my-10">
                    <div className="flex space-x-4">
                        <FinanceCard
                            title="Expenses this month"
                            amount={expensesAmount}
                            percentageChange={expensesPercentageChange}
                        />
                        <FinanceCard
                            title="Incomes this month"
                            amount={incomesAmount}
                            percentageChange={incomesPercentageChange}
                        />
                        <FinanceCard
                            title="Subscriptions this month"
                            amount={500}
                            percentageChange={5}
                        />
                    </div>
                </div>
                <div className="flex flex-row m-4">
                    <GoalCard currentIncome={50} incomeGoal={75} />
                    <GoalCard currentIncome={40} incomeGoal={100} />
                </div>
                <p className="text-xl font-bold block m-4">Recent Expenses</p>
                <div className="flex justify-center">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {/* Display up to 10 expenses */}
                        {expenses && expenses.map((expense) => (
                            <ExpenseItem
                                key={expense._id}
                                title={expense.title}
                                amount={expense.amount}
                                date={expense.date_recorded}
                                category={expense.category}
                            />
                        ))}


                    </div>
                </div>
                <p className="text-xl font-bold block m-4">Recent Incomes</p>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {/* Display up to 10 incomes */}
                        {incomes && incomes.map((income) => (
                            <IncomeItem
                                key={income._id}
                                source={income.source}
                                amount={income.amount}
                                date={income.date_recorded}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
