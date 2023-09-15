import React from 'react';

const GoalCard = ({ currentIncome, incomeGoal }) => {
    // Calculate the percentage of income achieved
    const percentageAchieved = (currentIncome / incomeGoal) * 100;

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-72">
            <h2 className="text-xl font-semibold mb-2">Income Goal</h2>
            <div className="relative h-40 w-40 mx-auto mb-4">
                {/* Ring Structure */}
                <div className="absolute h-full w-full rounded-full bg-gray-200 shadow-inner"></div>
                <div
                    className="absolute h-full w-full rounded-full bg-red-500 bg-opacity-40 shadow-md"
                    style={{ clipPath: `polygon(0 0, 100% 0, 100% ${percentageAchieved}%, 0 ${percentageAchieved}%)` }}
                ></div>
                <div className="absolute h-24 w-24 top-8 left-8 rounded-full bg-white border-4 border-red-500 shadow"></div>
                <div className="absolute h-20 w-20 top-10 left-10 rounded-full bg-red-500 bg-opacity-40 shadow-md">
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg font-semibold text-red-500">{`${percentageAchieved.toFixed(1)}%`}</p>
                    </div>
                </div>
            </div>
            <p className="text-gray-500">
                Current Income: ${currentIncome}
            </p>
            <p className="text-gray-500">
                Goal: ${incomeGoal}
            </p>
        </div>
    );
};

export default GoalCard;
