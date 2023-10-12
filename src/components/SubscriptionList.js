// SubscriptionList.js
import React from 'react';

const SubscriptionList = ({ subscriptions }) => {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
            <ul>
                {subscriptions.map((subscription, index) => (
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
    );
};

export default SubscriptionList;
