import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "@/features/auth/authSlice";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

function Signup() {
    const dispatch = useDispatch();
    const { user, loading } = useAuth();

const [form, setForm] = useState({
        email: "",
        password: "",
    });

if (loading) return null;
    if (user) return <Navigate to="/" replace />;

const handleSubmit = (e) => {
        console.log("button clicked");
        e.preventDefault();

        if (!form.email.includes("@")) {
            toast.error("Invalid email");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be 6+ chars");
            return;
        }

        dispatch(signupUser(form));
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-50 dark:bg-gray-950">
            <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 shadow rounded">
                <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-100">Signup</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="block mb-2 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-full"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="block mb-2 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-full"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Signup
                </button>
            </form>
            <NavLink to="/login" className="mt-4 text-blue-500 dark:text-blue-400">Already have an account? Login</NavLink>
        </div>
    );
}

export default Signup;
