import TaskList from "../features/tasks/TaskList";
import TaskForm from "../features/tasks/TaskForm";

function Tasks() {
    return (
        <div>
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default Tasks;