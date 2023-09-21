import React from 'react'
import { BarChart, LineChart, Line, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
const Charts = () => {
    const data1 = [
        { name: '0-10', count: 2 },
        { name: '11-20', count: 4 },
        { name: '21-30', count: 6 },
        { name: '31-40', count: 3 },
        { name: '41-50', count: 1 },
    ];

    // Chart 2: Line Graph
    const data2 = [
        { name: 'A', value: 5 },
        { name: 'B', value: 10 },
        { name: 'C', value: 15 },
        { name: 'D', value: 20 },
        { name: 'E', value: 25 },
    ];

    // Chart 3: Pie Chart
    const data3 = [
        { name: 'A', value: 30 },
        { name: 'B', value: 20 },
        { name: 'C', value: 10 },
        { name: 'D', value: 40 },
    ];

    const COLORS = ['#ff5722', '#2196f3', '#4caf50', '#e91e63'];


    return (
        <div className="flex">
            <div className="w-1/3 p-4">
                <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data1}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="w-1/3 p-4">
                <h2 className="text-lg font-semibold mb-4">Line Graph</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data2}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="w-1/3 p-4">
                <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
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