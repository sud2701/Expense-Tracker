import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useEffect } from "react";
const Signup = () => {
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const usernameContext = useContext(UserContext);
    const handleSignup = async (e) => {
        e.preventDefault();
        let res = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstname, lastname, email, username: user_name, password }),
            credentials: 'include'
        });
        let sign_up = await res.json();
        if (res.ok) {
            usernameContext.setUsername(user_name);
            localStorage.setItem('username', user_name);
            localStorage.setItem('firstname', sign_up.firstname);
            localStorage.setItem('lastname', sign_up.lastname);
            localStorage.setItem('email', sign_up.email)
            navigate("/main/dashboard");
        }
        else {
            console.log(sign_up.error);
            console.log("Unsuccessful Sign Up");
        }
    }
    useEffect(() => {
        if (usernameContext.username) {
            navigate("/dashboard");
        }
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="signup mx-1/12 w-3/4 md:w-1/3 flex flex-col border-4 border-red-700 shadow-lg rounded-xl items-center justify-center">
                <h1 className="my-3 text-red-700 text-lg font-bold">Sign Up</h1>
                <form action="" className="w-full px-3 py-2">
                    <label className="mx-5 my-3 text-md text-red-700 font-bold block">First Name</label>
                    <input type="text" name="firstname" className="rounded-lg border-2 border-red-700 px-4 py-3 block w-full my-2" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                    <label className="mx-5 my-3 text-md text-red-700 font-bold block">Last Name</label>
                    <input type="text" name="lastname" className="rounded-lg border-2 border-red-700 px-4 py-3 block w-full my-2" value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                    <label className="mx-5 my-3 text-md text-red-700 font-bold block">Email Address</label>
                    <input type="email" name="email" className="rounded-lg border-2 border-red-700 px-4 py-3 block w-full my-2" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label className="mx-5 my-3 text-md text-red-700 font-bold block">Username</label>
                    <input type="text" name="username" className="rounded-lg border-2 border-red-700 px-4 py-3 block w-full my-2" value={user_name} onChange={(e) => { setUserName(e.target.value) }} />
                    <label className="mx-5 my-3 text-md text-red-700 font-bold block">Password</label>
                    <input type="password" name="password" className="rounded-lg border-2 border-red-700 px-4 py-3 block w-full my-2" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <div className="w-full flex items-center justify-center">
                        <button onClick={handleSignup} disabled={!user_name || !password || !firstname || !lastname || !email} className="mx-4 py-4 my-3 w-1/2 rounded bg-red-700 font-bold text-white cursor-pointer">Sign Up</button>
                    </div>
                </form>
                {error && <div>
                    {error}
                </div>}
                <Link to="/login" className="text-blue-700 underline text-sm justify-self-center mb-4">Log In instead</Link>
            </div>
        </div>
    );
}

export default Signup;