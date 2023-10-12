import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const usernameContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/login/", {
            method: "POST",
            body: JSON.stringify({ username: user_name, password }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const sign_in = await res.json();
        if (res.ok) {
            usernameContext.setUsername(user_name);
            localStorage.setItem('username', user_name);
            localStorage.setItem('firstname', sign_in.firstname);
            localStorage.setItem('lastname', sign_in.lastname);
            localStorage.setItem('email', sign_in.email);
            navigate("/main/dashboard");
        } else {
            console.log(sign_in.error);
            console.log("Unsuccessful Login");
        }
    }

    useEffect(() => {
        // Show the form with a delay to allow the fade-in animation
        setTimeout(() => {
            setIsFormVisible(true);
        }, 300);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className={`w-full max-w-md p-8 bg-white rounded-lg shadow-lg transition-opacity ${isFormVisible ? "opacity-100" : "opacity-0"}`}>
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-indigo-300 focus:outline-none"
                            placeholder="Your Username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-indigo-300 focus:outline-none"
                            placeholder="Your Password"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={!user_name || !password}
                        className="w-full py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-sm text-red-600">Errors will appear here.</p>
                <div className="mt-4 text-center">
                    <Link to="/signup" className="text-indigo-600 hover:underline">
                        New User? Sign Up instead
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
