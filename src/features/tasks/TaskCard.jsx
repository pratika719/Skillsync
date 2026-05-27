import { memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "@/hooks/useModal";
import Modal from "@/components/shared/Modal";
import { useTaskQuery } from "./useTaskQuery";
import { useSkillQuery } from "../skills/useSkillQuery";

const TaskCard = memo(function TaskCard({ task }) {
  const { toggleTask, removeTask, updateTask } = useTaskQuery();
  const { skills } = useSkillQuery();
  const { isOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const skill = skills.find((s) => s.id === task.skillId);

  const handleDeleteClick = useCallback(() => openModal(), [openModal]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await removeTask(task.id);
    } catch (err) {
      console.error("Delete task error:", err);
    }
  }, [removeTask, task.id]);

  const handleEdit = async () => {
    if (!newTitle.trim()) return;
    try {
      await updateTask(task.id, { title: newTitle });
      setIsEditing(false);
    } catch (err) {
      console.error("Edit task error:", err);
    }
  };

  const handleToggle = useCallback(async () => {
    try {
      await toggleTask(task);
    } catch (err) {
      console.error("Toggle task error:", err);
    }
  }, [toggleTask, task]);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          transition: { duration: 0.15 },
        }}
        whileTap={{ scale: 0.99 }}
        className="p-4 bg-white dark:bg-gray-800 shadow rounded flex justify-between items-center"
      >
        {}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.input
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded w-full"
                autoFocus
              />
            ) : (
              <motion.h3
                key="title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="font-semibold text-gray-800 dark:text-gray-100"
              >
                {task.completed ? "✅ " : ""}{task.title}
                {skill && (
                  <span className="ml-2 text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    {skill.title}
                  </span>
                )}
              </motion.h3>
            )}
          </AnimatePresence>
        </div>

        {}
        <div className="flex gap-2 ml-4">

          {}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          >
            {task.completed ? "Undo" : "Done"}
          </motion.button>

          {}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.button
                key="save"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Save
              </motion.button>
            ) : (
              <motion.button
                key="edit"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
              >
                Edit
              </motion.button>
            )}
          </AnimatePresence>

          {}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteClick}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>

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