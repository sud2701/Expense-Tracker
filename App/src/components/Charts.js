import React from 'react'
import { useState, useEffect } from 'react';
import { BarChart, LineChart, Line, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
const Charts = () => {
    const [expenseAggregates, setExpenseAggregates] = useState([]);
    const [incomeAggregates, setIncomeAggregates] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const username = localStorage.getItem('username');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const categories = ["Home", "Groceries", "Repair", "Food", "Education", "Clothing and Accessories", "Furniture", "Refreshment", "Health Care", "Miscellaneous"];
    const curr_month = new Date().getMonth();
    let data1 = [];
    let data2 = [];
    let data3 = [];
    useEffect(() => {
        const getData = async () => {
            const exp_aggs = await fetch(`http://localhost:4000/monthly-expense-aggregates?username=${username}`);
            const inc_aggs = await fetch(`http://localhost:4000/monthly-income-aggregates?username=${username}`);
            const exp = await fetch(`http://localhost:4000/expenses/month?username=${username}&month=${curr_month + 1}`);
            if (exp_aggs.ok) {
                const expense_aggs = await exp_aggs.json();

                setExpenseAggregates(expense_aggs);
            }
            if (inc_aggs.ok) {
                const income_aggs = await inc_aggs.json();

                setIncomeAggregates(income_aggs);
            }
            if (exp.ok) {

                const exps = await exp.json();

                setExpenses(exps);
            }


        }
        getData();

    }, []);

    const loadChartData = () => {
        for (let i = 0; i < expenseAggregates.length; i++) {
            if (expenseAggregates[i].length === 0) {
                data1.push({ name: months[curr_month - i], Expenses: 0 });
            }
            else {
                data1.push({ name: months[curr_month - i], Expenses: expenseAggregates[i][0].total });
            }

        }

        // Chart 2: Line Graph

        for (let i = 0; i < incomeAggregates.length; i++) {
            if (incomeAggregates[i].length === 0) {
                data2.push({ name: months[curr_month - i], Income: 0 });
            }
            else {
                data2.push({ name: months[curr_month - i], Income: incomeAggregates[i][0].total });
            }
        }

        // Chart 3: Pie Chart

        if (expenses.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                let sum = 0;
                let category_expenses = expenses.filter(exp => exp.category === categories[i]);
                if (category_expenses.length === 0) {
                    continue;
                }
                category_expenses.map((expense) => {
                    sum += expense.amount;
                });
                if (sum === 0) {
                    continue;
                }
                else {
                    data3.push({ name: categories[i], value: sum });
                }
            }
        }
        else {
            for (let i = 0; i < categories.length; i++) {
                data3.push({ name: categories[i], value: 0 });
            }
        }
    }
    loadChartData();




    const COLORS = ['#ff5722', '#2196f3', '#4caf50', '#e91e63'];


    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 py-4">
                <h2 className="text-lg self-center font-semibold mb-4">Monthly Expenses</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data1}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Expenses" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col w-1/3 py-4">
                <h2 className="text-lg self-center font-semibold mb-4">Monthly Income</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data2}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="Income" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col w-1/3 py-4">
                <h2 className="text-lg self-center font-semibold mb-4">Expense Distribution</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={data3}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={(entry) => entry.name}
                        >
                            {data3.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Charts