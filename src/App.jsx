import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { account } from "./appwrite/config.js";
import { useEffect } from "react";
function App() {
  

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
                          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;