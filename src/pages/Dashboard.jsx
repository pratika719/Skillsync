function Dashboard() {
    return (
        <div className="grid grid-cols-3 gap-6">

            <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-lg">Total Tasks</h2>
                <p className="text-3xl font-bold">12</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-lg">Completed</h2>
                <p className="text-3xl font-bold text-green-400">8</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-lg">Pending</h2>
                <p className="text-3xl font-bold text-red-400">4</p>
            </div>

        </div>
    );
}

export default Dashboard;