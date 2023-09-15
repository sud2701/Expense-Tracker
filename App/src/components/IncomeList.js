import React from 'react';
import IncomeItem from './IncomeItem';

const IncomeList = ({ incomes }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">Incomes</h2>
            {incomes.map((income) => (
                <IncomeItem key={income._id} income={income} />
            ))}
        </div>
    );
};

export default IncomeList;
