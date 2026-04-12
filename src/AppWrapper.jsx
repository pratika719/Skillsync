import { useEffect } from "react";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import { lazy, Suspense } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSkills } from "./hooks/useSkills";
import { useTasks } from "./hooks/useTasks";
import { useAuth } from "./hooks/useAuth";


const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Skills = lazy(() => import("./pages/Skills"));



function AppWrapper() {
    const { user, loading, restoreSession } = useAuth();
    const { loadSkills } = useSkills();
    const { loadTasks } = useTasks();

    useEffect(() => {

        restoreSession();
    }, []);

    useEffect(() => {
        if (user && !loading) {
            loadSkills(user.id);
            loadTasks(user.id);
        }
    }, [user, loading]);

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