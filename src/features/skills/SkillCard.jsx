import { memo, useCallback } from "react";
import { useSkills } from "./useSkills";
import { useModal } from "@/hooks/useModal";
import { useSelector } from "react-redux";
import { selectTaskBySkill } from "@/features/tasks/taskSelectors";
import Modal from "@/components/shared/Modal";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["not_started", "in_progress", "completed"];
const STATUS_STYLES = {
  not_started: "bg-gray-100 text-gray-600",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const SkillCard = memo(function SkillCard({ skill }) {
  const { updateSkill, removeSkill } = useSkills();
  const { isOpen, openModal, closeModal } = useModal();
  const linkedTasks = useSelector(selectTaskBySkill(skill.id));

  const handleDeleteClick = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await removeSkill(skill.id);
      toast.success("Skill deleted 🗑️");
    } catch {
      toast.error("Failed to delete skill ❌");
    }
  }, [removeSkill, skill.id]);

  const handleStatusChange = useCallback(async (e) => {
    try {
      await updateSkill(skill.id, { status: e.target.value });
      toast.success("Status updated ✅");
    } catch {
      toast.error("Failed to update status ❌");
    }
  }, [updateSkill, skill.id]);

  return (
    <>
      <div className="p-4 bg-white shadow rounded space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{skill.title}</h3>
          <div className="flex gap-2 items-center">
            <select
              value={skill.status}
              onChange={handleStatusChange}
              className={`text-sm px-2 py-1 rounded border ${STATUS_STYLES[skill.status]}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </select>
            {/* ✅ opens modal instead of deleting directly */}
            <button onClick={handleDeleteClick} className="px-2 py-1 bg-red-500 text-white rounded text-sm">
              Delete
            </button>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-400 mb-1">
            Linked tasks ({linkedTasks.length})
          </p>
          {linkedTasks.length === 0 ? (
            <p className="text-xs text-gray-300">No tasks linked to this skill</p>
          ) : (
            <ul className="space-y-1">
              {linkedTasks.map((task) => (
                <li key={task.id} className="text-sm text-gray-600 flex items-center gap-2">
                  <span>{task.completed ? "✅" : "⬜"}</span>
                  <span>{task.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
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