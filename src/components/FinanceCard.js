import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const FinanceCard = ({ amount, percentageChange, title }) => {
    const isIncrease = percentageChange >= 0;
    const text = isIncrease ? "increase this month" : "decrease this month";
    return (
        <div className="bg-white rounded-lg p-4 shadow-md w-max px-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold px-6">{title}</h2>
                <div className="flex items-center">


                </div>
            </div>
            <div className="my-2 flex justify-center">
                <p className="text-xl font-semibold">${amount}</p>
            </div>
            <div className="flex justify-center items-center">
                {isIncrease ? (
                    <FiArrowUp className="text-green-500 mr-1" />
                ) : (
                    <FiArrowDown className="text-red-500 mr-1" />
                )}
                <p className={isIncrease ? 'text-green-500' : 'text-red-500'}>
                    {Math.abs(percentageChange)}% {text}
                </p>
            </div>
        </div>
    );
};

export default FinanceCard;
