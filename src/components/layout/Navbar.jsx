import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authslice";
import { useTheme } from "../../context/ThemeContext";    // ← ADD

function Navbar() {
    const { theme, toggleTheme } = useTheme();            // ← REPLACE useState
    const dispatch = useDispatch();

    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Dashboard
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                />

                {/* Dark Mode Toggle — NOW FUNCTIONAL */}
                <button
                    onClick={toggleTheme}                  // ← USE CONTEXT
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                    {theme === "dark" ? "☀️" : "🌙"}       {/* ← DYNAMIC ICON */}
                </button>

                <button
                    onClick={() => dispatch(logoutUser())}
                    className="bg-red-500 text-white px-3 py-1"
                >
                    Logout
                </button>

                {/* Profile */}
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                    P
                </div>
            </div>
        </header>
    );
}

export default Navbar;
