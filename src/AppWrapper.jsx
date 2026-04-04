import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/authslice";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Skills from "./pages/Skills";
import Login from "./pages/Login";

function AppWrapper() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser()); // 🔥 STEP 5 happens here
    }, [dispatch]);

    return (
        <Routes>

            {/* Protected routes (we'll add protection next if needed) */}
            <Route element={<ProtectedRoute />}>
            <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="skills" element={<Skills />} />
            </Route>
            </Route>

            {/* Public route */}
            <Route path="/login" element={<Login />} />

        </Routes>
    );
}

export default AppWrapper;