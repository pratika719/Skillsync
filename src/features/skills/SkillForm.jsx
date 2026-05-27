import { useState } from "react";
import toast from "react-hot-toast";
import { useSkillQuery } from "./useSkillQuery";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSelectors";

function SkillForm() {
  const [title, setTitle] = useState("");
  const { createSkill, isAdding } = useSkillQuery();
  const user = useSelector(selectUser);

  const handleAdd = async () => {
    if (!title.trim()) { toast.error("Skill name cannot be empty ❌"); return; }
    try {
      await createSkill({ title, status: "not_started", userId: user?.id });
      setTitle("");
    } catch (err) {
      console.error("Create skill error:", err);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter skill name..."
        disabled={isAdding}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded w-full placeholder-gray-400 disabled:opacity-50"
      />
      <button
        onClick={handleAdd}
        disabled={isAdding}
        className="px-4 bg-purple-500 text-white rounded disabled:bg-purple-300 whitespace-nowrap"
      >
        {isAdding ? "Adding..." : "Add Skill"}
      </button>
    </div>
  );
}

export default SkillForm;