import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../features/auth/authservices";
import { logoutUser } from "../../store/authslice";
function Navbar() {
    const [dark, setDark] = useState(true);
    
    const dispatch = useDispatch();

    return (
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">

            {/* Left */}
            <div className="text-lg font-semibold text-gray-200">
                Dashboard
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-800 text-sm px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setDark(!dark)}
                    className="px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                >
                    🌙
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