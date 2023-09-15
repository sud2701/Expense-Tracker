import React from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/login", { replace: true });
    }
    const handleCancel = () => {
        navigate(-1);
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white w-2/3 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold m-3">Logout</h2>
                    <p className="font-bold text-md m-3">Are you sure you want to Log Out?</p>
                    <div className="flex">
                        <button onClick={handleLogout} className="bg-red-500 m-3 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400">Yes, Logout</button>
                        <button onClick={handleCancel} className="bg-blue-500 m-3 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout