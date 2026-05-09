import { useEffect } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import App from "@/app/App";
import { lazy, Suspense } from "react";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

import { useAuth } from "@/features/auth/useAuth";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TasksPage = lazy(() => import("@/pages/TasksPage"));
const SkillsPage = lazy(() => import("@/pages/SkillsPage"));

function AppWrapper() {
    const { user, loading, restoreSession } = useAuth();

useEffect(() => {
        restoreSession();
    }, []);

return (
        <Suspense fallback={<p className="p-6 text-gray-400">Loading...</p>}>
            <Routes>

                {}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<App />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="tasks" element={<TasksPage />} />
                        <Route path="skills" element={<SkillsPage />} />
                    </Route>
                </Route>

                {}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

            </Routes>
        </Suspense>
    );
}

export default AppWrapper;
