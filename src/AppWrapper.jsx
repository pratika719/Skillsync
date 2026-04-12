import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/authslice";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import { lazy, Suspense } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Dashboard=lazy(()=>import("./pages/Dashboard"));
const Tasks=lazy(()=>import("./pages/Tasks"));
const Skills=lazy(()=>import("./pages/Skills"));



function AppWrapper() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser()); // 🔥 STEP 5 happens here
    }, [dispatch]);

    return (
        <Suspense fallback={<p className="p-6 text-gray-400">Loading...</p>}>
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
            <Route path="/signup" element={<Signup />} />

        </Routes>
         </Suspense>
    );
}

export default AppWrapper;