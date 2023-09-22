// GoalList.js
import React from 'react';

const GoalList = ({ goals }) => {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Goals</h2>
            <ul>
                {goals.map((goal, index) => (
                    <li key={index} className="mb-2">
                        <strong>Amount:</strong> {goal.amount},{' '}
                        <strong>Category:</strong> {goal.category},{' '}
                        <strong>Begin Date:</strong> {goal.begins_On},{' '}
                        <strong>Expiration Date:</strong> {goal.expires_On}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalList;
