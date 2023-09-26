import React, { useState } from 'react';

import CreateGoalModal from '../components/CreateGoalModal';
import CreateSubscriptionModal from '../components/CreateSubscriptionModal';
import NavBar from './Navbar';
import { useEffect } from 'react';
import { formatDate } from '../utils/functions';
function GoalAndSubs() {
    const username = localStorage.getItem('username');
    const [goals, setGoals] = useState([]);
    const [subs, setSubs] = useState([]);
    const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
    const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] = useState(false);

    const openCreateGoalModal = () => {
        setShowCreateGoalModal(true);
    };

    const closeCreateGoalModal = () => {
        setShowCreateGoalModal(false);
    };

    const openCreateSubscriptionModal = () => {
        setShowCreateSubscriptionModal(true);
    };

    const closeCreateSubscriptionModal = () => {
        setShowCreateSubscriptionModal(false);
    };

    useEffect(() => {
        const getData = async (url, setData) => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (res.ok) {
                    console.log(data);
                    setData(data);
                }
            }
            catch (err) {
                console.log("Unable to fetch data");
            }
        }
        getData(`http://localhost:4000/goals?username=${username}`, setGoals);
        getData(`http://localhost:4000/subscriptions?username=${username}`, setSubs);
    }, [username]);

    return (
        <div className="flex h-screen bg-gray-200">
            <NavBar />
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Goals and Subscriptions</h1>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={openCreateGoalModal}
                >
                    Create New Goal
                </button>

                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-4"
                    onClick={openCreateSubscriptionModal}
                >
                    Create New Subscription
                </button>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Goals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {goals.map((goal, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-semibold mb-2">Goal {index + 1}</h3>
                                <p>
                                    <strong>Amount:</strong> {goal.amount}
                                </p>
                                <p>
                                    <strong>Category:</strong> {goal.category}
                                </p>
                                <p>
                                    <strong>Begin Date:</strong> {formatDate(goal.begins_On)}
                                </p>
                                <p>
                                    <strong>Expiration Date:</strong> {formatDate(goal.expires_On)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
                    <ul>
                        {subs.map((subscription, index) => (
                            <li key={index} className="mb-2">
                                <strong>Name:</strong> {subscription.name},{' '}
                                <strong>Amount:</strong> {subscription.amount},{' '}
                                <strong>Begin Date:</strong> {subscription.begins_On},{' '}
                                <strong>Expiration Date:</strong> {subscription.expires_On},{' '}
                                <strong>Repeats:</strong> {subscription.repeats}
                            </li>
                        ))}
                    </ul>
                </div>

                {showCreateGoalModal && (
                    <CreateGoalModal isOpen={showCreateGoalModal} onClose={closeCreateGoalModal} />
                )}

                {showCreateSubscriptionModal && (
                    <CreateSubscriptionModal
                        isOpen={showCreateSubscriptionModal}
                        onClose={closeCreateSubscriptionModal}
                    />
                )}
            </div>
        </div>
    );
}

export default GoalAndSubs;
