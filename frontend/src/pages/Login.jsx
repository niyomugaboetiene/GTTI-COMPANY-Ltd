import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const res = await axios.post(
                "http://localhost:5000/manager/login",
                { userName, password }
            );

            // reset fields
            setUserName("");
            setPassword("");
            alert(res.data.message);
            navigate('/')

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-blue-100 p-6 w-full max-w-md rounded-xl shadow-lg"
            >

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Login Page
                </h1>

                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Username
                    </label>

                    <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter user name"
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 w-full py-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;