import { toggleTask, deleteTask } from "../../services/taskservices";

function TaskCard({ task, onUpdate, onDelete }) {
    return (
        <div className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
            </div>

            <div className="flex gap-2">
                {/* Toggle */}
                <button
                    onClick={async () => {
                        await toggleTask(task.id || task.$id);
                        onUpdate(); // 🔥 just refresh
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                    {task.completed ? "Undo" : "Done"}
                </button>

                {/* Delete */}
                <button
                    onClick={async () => {
                        await deleteTask(task.id || task.$id);
                        onDelete(); // 🔥 just refresh
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;