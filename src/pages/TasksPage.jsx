import TaskList from "@/features/tasks/TaskList";
import TaskForm from "@/features/tasks/TaskForm";

function TasksPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tasks</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default TasksPage;
