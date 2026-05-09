import { memo, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSkillQuery } from "./useSkillQuery";
import { useModal } from "@/hooks/useModal";
import { useTaskQuery } from "../tasks/useTaskQuery";
import Modal from "@/components/shared/Modal";

const STATUS_OPTIONS = ["not_started", "in_progress", "completed"];
const STATUS_STYLES = {
  not_started: "bg-gray-100 text-gray-600",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const SkillCard = memo(function SkillCard({ skill }) {
  const { updateSkill, removeSkill } = useSkillQuery();
  const { tasks } = useTaskQuery();
  const { isOpen, openModal, closeModal } = useModal();
  const linkedTasks = useMemo(() => tasks.filter(t => t.skillId === skill.id), [tasks, skill.id]);

  const handleDeleteClick = useCallback(() => openModal(), [openModal]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await removeSkill(skill.id);
    } catch {

    }
  }, [removeSkill, skill.id]);

  const handleStatusChange = useCallback(async (e) => {
    try {
      await updateSkill(skill.id, { status: e.target.value });
    } catch {

    }
  }, [updateSkill, skill.id]);

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
        className="p-4 bg-white dark:bg-gray-800 shadow rounded space-y-2"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg dark:text-gray-100">{skill.title}</h3>
          <div className="flex gap-2 items-center">
            <motion.select
              value={skill.status}
              onChange={handleStatusChange}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`text-sm px-2 py-1 rounded border ${STATUS_STYLES[skill.status]}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </motion.select>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeleteClick}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </motion.button>
          </div>
        </div>

        {}
        <div className="mt-2">
          <p className="text-xs text-gray-400 mb-1">
            Linked tasks ({linkedTasks.length})
          </p>
          <AnimatePresence>
            {linkedTasks.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-gray-300"
              >
                No tasks linked to this skill
              </motion.p>
            ) : (
              <motion.ul className="space-y-1">
                {linkedTasks.map((task, index) => (
                  <motion.li
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                  >
                    <span>{task.completed ? "✅" : "⬜"}</span>
                    <span>{task.title}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Delete Skill"
        message={`Are you sure you want to delete "${skill.title}"? All ${linkedTasks.length} linked task(s) will lose this skill tag.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        confirmStyle="bg-red-500 hover:bg-red-600"
      />
    </>
  );
});

export default SkillCard;