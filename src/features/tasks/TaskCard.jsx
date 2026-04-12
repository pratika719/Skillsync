import { useDispatch } from "react-redux";
import {
  toggleTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
} from "../../store/taskslice";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { memo,useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const TaskCard = memo(function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

const handleDelete = useCallback(async () => {
  try {
    await dispatch(deleteTaskAsync(task.id)).unwrap(); // ✅ waits for result
    toast.success("Task deleted 🗑️");
  } catch (err) {
    toast.error("Failed to delete task ❌");
    console.error("Delete error:", err); // Debug log
  }
}, [dispatch, task.id]);
const handleEdit = async () => {
  if (!newTitle.trim()) { toast.error("Title cannot be empty ❌"); return; }
  try {
    await dispatch(editTaskAsync({ id: task.id, data: { title: newTitle } })).unwrap();
    toast.success("Task updated ✏️");
    setIsEditing(false);
  } catch { toast.error("Failed to update task ❌"); }
};

const handleToggle = useCallback(async () => {
  try {
    await dispatch(toggleTaskAsync(task)).unwrap();
    toast.success("Task updated ✅");
  } catch { toast.error("Failed to update task ❌"); }
}, [dispatch, task]);

  return (
    <div className="p-4 bg-white shadow rounded flex justify-between items-center">
      
      {/* LEFT SIDE */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          <h3 className="font-semibold">
            {task.completed ? "✅ " : ""} {task.title}
          </h3>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-2 ml-4">

        {/* Toggle */}
        <button
          onClick={() => {
            dispatch(toggleTaskAsync(task)); // ✅ FIXED
            toast.success("Task updated ✅");
          }}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        {/* Edit */}
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="px-2 py-1 bg-yellow-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 bg-gray-500 text-white rounded"
          >
            Edit
          </button>
        )}

        {/* Delete */}
        <button
  onClick={handleDelete}
  className="px-2 py-1 bg-red-500 text-white rounded"
>
  Delete
</button>
      </div>
    </div>
  );
});

export default TaskCard;