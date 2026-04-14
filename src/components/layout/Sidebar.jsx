import { NavLink } from "react-router-dom";


const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Skills", path: "/skills" },
];

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">

            {/* Logo */}
            <div className="p-6 text-2xl font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
                SkillSync
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${isActive
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-400 dark:text-gray-500">
                © 2026 SkillSync
            </div>
        </aside>
    );
}

export default Sidebar;