import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../store/authslice.js";
import { NavLink } from "react-router-dom";
function Signup() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        console.log("button clicked");
        e.preventDefault();

        // ✅ Basic validation
        if (!form.email.includes("@")) {
            alert("Invalid email");
            return;
        }

        if (form.password.length < 6) {
            alert("Password must be 6+ chars");
            return;
        }

        dispatch(signupUser(form));
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button type="submit">Signup</button>


        </form>
<NavLink to="/login">Already have an account? Login</NavLink>
        </>


    );
}

export default Signup;