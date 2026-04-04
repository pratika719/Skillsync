import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskservices";
import TaskCard from "./TaskCard";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Fetch tasks (reusable)
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Run once on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // 🔥 Called after update/delete
    const handleRefresh = async () => {
        await fetchTasks();
    };

    if (loading) {
        return <p className="text-gray-500">Loading tasks...</p>;
    }

    if (tasks.length === 0) {
        return <p className="text-gray-400">No tasks found</p>;
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id || task.$id} // supports both mock + Appwrite
                    task={task}
                    onUpdate={handleRefresh}
                    onDelete={handleRefresh}
                />
            ))}
        </div>
    );
}

export default TaskList;