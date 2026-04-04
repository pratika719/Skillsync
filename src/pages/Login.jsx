import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authslice";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const onSubmit =  (e) => {
    e.preventDefault(); 
   dispatch(loginUser({ email, password }))
    navigate("/");
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
        </div>
    );
}


export default Login;