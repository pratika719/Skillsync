import { memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useTasks } from "./useTasks";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/shared/Modal";

const TaskCard = memo(function TaskCard({ task }) {
  const { toggleTask, removeTask, editTask } = useTasks();
  const { isOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  // Opens the confirmation modal
  const handleDeleteClick = useCallback(() => {
    openModal();
  }, [openModal]);

  // Called when user confirms deletion in the modal
  const handleDeleteConfirm = useCallback(async () => {
    try {
      await removeTask(task.id);
      toast.success("Task deleted 🗑️");
    } catch {
      toast.error("Failed to delete task ❌");
    }
  }, [removeTask, task.id]);

  const handleEdit = async () => {
    if (!newTitle.trim()) { toast.error("Title cannot be empty ❌"); return; }
    try {
      await editTask(task.id, { title: newTitle });
      toast.success("Task updated ✏️");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update task ❌");
    }
  };

  const handleToggle = useCallback(async () => {
    try {
      await toggleTask(task);
      toast.success("Task updated ✅");
    } catch {
      toast.error("Failed to update task ❌");
    }
  }, [toggleTask, task]);

  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-800 shadow rounded flex justify-between items-center">

        {/* LEFT SIDE */}
        <div className="flex-1">
          {isEditing ? (
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded w-full"
            />
          ) : (
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {task.completed ? "✅ " : ""}{task.title}
            </h3>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex gap-2 ml-4">

          {/* Toggle */}
          <button
            onClick={handleToggle}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            {task.completed ? "Undo" : "Done"}
          </button>

          {/* Edit / Save */}
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

          {/* Delete — opens modal */}
          <button
            onClick={handleDeleteClick}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        confirmStyle="bg-red-500 hover:bg-red-600"
      />
    </>
  );
});

export default TaskCard;