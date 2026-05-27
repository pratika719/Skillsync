import { useState } from "react";

import toast from "react-hot-toast";
import { useTaskQuery } from "./useTaskQuery";
import { useSkillQuery } from "../skills/useSkillQuery";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSelectors";

function TaskForm() {
  const [text, setText] = useState("");
  const [skillId, setSkillId] = useState("");
  const { createTask, isAdding } = useTaskQuery();
  const { skills } = useSkillQuery();
  const user = useSelector(selectUser);

const handleAdd = async () => {
    if (!text.trim()) { toast.error("Task cannot be empty ❌"); return; }
    try {
      await createTask({ title: text, completed: false, userId: user?.id, skillId: skillId || null });
      setText("");
      setSkillId("");
    } catch (err) {
      console.error("Create task error:", err);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
        disabled={isAdding}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded w-full placeholder-gray-400 disabled:opacity-50"
      />
      <select
        value={skillId}
        onChange={(e) => setSkillId(e.target.value)}
        disabled={isAdding}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded disabled:opacity-50"
      >
        <option value="">No skill</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>{skill.title}</option>
        ))}
      </select>
      <button
        onClick={handleAdd}
        disabled={isAdding}
        className="px-4 bg-green-500 text-white rounded disabled:bg-green-300 whitespace-nowrap"
      >
        {isAdding ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;