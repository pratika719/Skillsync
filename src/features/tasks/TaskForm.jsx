import { useState } from "react";
import { addTask } from "../../services/taskservices";

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        const newTask = await addTask(title);
        onAdd(newTask);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a task..."
                className="flex-1 p-2 rounded bg-gray-800"
            />
            <button className="bg-blue-500 px-4 rounded">Add</button>
        </form>
    );
}

export default TaskForm;