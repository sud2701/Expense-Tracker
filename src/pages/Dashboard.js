import { useState, useEffect } from "react";
import FinanceCard from '../components/FinanceCard';
import ExpenseItem from '../components/ExpenseItem';
import IncomeItem from '../components/IncomeItem';
import GoalCard from '../components/GoalCard';
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Charts from "../components/Charts";
const calculateIncrease = (p1, p2) => {
    if (p1 > 0) {
        return ((p2 - p1) * 100 / p1).toFixed(2);
    }
    else {
        return 100;
    }
}
const Dashboard = () => {
    const [exp_curr, setExpCurr] = useState();
    const [inc_curr, setIncCurr] = useState();
    const [exp_change, setExpChange] = useState();
    const [inc_change, setIncChange] = useState();
    const username = localStorage.getItem('username');
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (username === null) {
            navigate("/login", { replace: true });
        } else {
            console.log(username);
            const loadDashboard = async () => {
                const res = await fetch(`http://localhost:4000/dashboard?username=${username}`);
                const total_data = await res.json();
                if (res.ok) {

                    setExpenses(total_data.recent_expenses);
                    setIncomes(total_data.recent_incomes);
                    setExpCurr(total_data.this_expenses_total);
                    setIncCurr(total_data.this_incomes_total);
                    setExpChange(calculateIncrease(total_data.last_expenses_total, total_data.this_expenses_total));
                    setIncChange(calculateIncrease(total_data.last_incomes_total, total_data.this_incomes_total));
                }
                else {
                    console.log("Unable to fetch this month's transaction data");
                }
            }
            loadDashboard();
        }

    }, [username, navigate]);






    return (
        <div className="flex h-screen bg-gray-200">
            <NavBar />
            <div className="flex-1 py-6 px-6 overflow-y-auto">
                <p>Paypal Username: </p>
                <p className="font-bold text-lg my-2">Welcome, {username}</p>
                {/* Chart Section */}
                <Charts />

                <div className="flex justify-center mx-2 my-10">
                    <div className="flex space-x-4">
                        <FinanceCard
                            title="Expenses this month"
                            amount={exp_curr}
                            percentageChange={exp_change}
                        />
                        <FinanceCard
                            title="Incomes this month"
                            amount={inc_curr}
                            percentageChange={inc_change}
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
