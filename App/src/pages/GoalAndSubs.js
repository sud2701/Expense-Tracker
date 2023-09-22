import React, { useState } from 'react';
import GoalList from '../components/GoalList';
import SubscriptionList from '../components/SubscriptionList';
import CreateGoalModal from '../components/CreateGoalModal';
import CreateSubscriptionModal from '../components/CreateSubscriptionModal';
import NavBar from './Navbar';
import { useEffect } from 'react';
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
                    setData(data);
                }
            }
            catch (err) {
                console.log("Unable to fetch data");
            }
        }
        getData(`http://localhost:4000/goals?username=${username}`, setGoals);
        getData(`http://localhost:4000/subscriptions?username=${username}`, setSubs);
    }, [goals, subs]);

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

                <GoalList goals={goals} />
                <SubscriptionList subscriptions={subs} />

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
