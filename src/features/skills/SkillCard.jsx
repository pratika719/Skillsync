import { useDispatch, useSelector } from "react-redux";
import { deleteSkillAsync, editSkillAsync } from "../../store/skillslice";
import toast from "react-hot-toast";
import { memo } from "react";
import { selectTaskBySkill } from "../../store/selectors";
const STATUS_OPTIONS = ["not_started", "in_progress", "completed"];

const STATUS_STYLES = {
  not_started: "bg-gray-100 text-gray-600",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const SkillCard = memo(function SkillCard({ skill }) {
  const dispatch = useDispatch();

  // tasks tagged to this skill
  const linkedTasks = useSelector(selectTaskBySkill(skill.id));
  const handleDelete = async () => {
    try {
      await dispatch(deleteSkillAsync(skill.id)).unwrap();
      toast.success("Skill deleted 🗑️");
    } catch (err) {
      toast.error("Failed to delete skill ❌");
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await dispatch(
        editSkillAsync({ id: skill.id, data: { status: e.target.value } })
      ).unwrap();
      toast.success("Status updated ✅");
    } catch (err) {
      toast.error("Failed to update status ❌");
    }
  };

  return (
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
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Linked tasks */}
      <div className="mt-2">
        <p className="text-xs text-gray-400 mb-1">
          Linked tasks ({linkedTasks.length})
        </p>
        {linkedTasks.length === 0 ? (
          <p className="text-xs text-gray-300">No tasks linked to this skill</p>
        ) : (
          <ul className="space-y-1">
            {linkedTasks.map((task) => (
              <li
                key={task.id}
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <span>{task.completed ? "✅" : "⬜"}</span>
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
})

export default SkillCard;