import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/taskslice";
import TaskCard from "./TaskCard";

function TaskList() {
  const dispatch = useDispatch();
  const { items: tasks, loading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.id)); // ✅ FIXED: was user.id
    }
  }, [user, dispatch]);

  if (loading) {
    return <p className="text-gray-500">Loading tasks...</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-400">No tasks found</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;