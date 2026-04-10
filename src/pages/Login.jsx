import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authslice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
    await dispatch(loginUser({ email, password })).unwrap();

    toast.success("Login successful 🚀");
    navigate("/");
  } catch (err) {
    toast.error("Login failed ❌");
  }
};

 return (
        <div className="flex h-screen justify-center items-center">
            <form onSubmit={onSubmit} className="p-6 bg-white shadow rounded">
                <h2 className="text-xl mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="block mb-2 p-2 border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="block mb-2 p-2 border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-500 text-white px-4 py-2">
                    Login
                </button>
            </form>
<NavLink to="/signup" className="mt-4 text-blue-500">Don't have an account? Signup</NavLink>
        </div>
    );
}


export default Login;