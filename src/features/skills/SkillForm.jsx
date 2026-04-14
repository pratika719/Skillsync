import { useState } from "react";
import { useSkills } from "../../hooks/useSkills";
import toast from "react-hot-toast";

function SkillForm() {
  const [title, setTitle] = useState("");
  const { createSkill } = useSkills();

  const handleAdd = async () => {
    if (!title.trim()) { toast.error("Skill name cannot be empty ❌"); return; }
    try {
      await createSkill(title);
      toast.success("Skill added ✅");
      setTitle("");
    } catch {
      toast.error("Failed to add skill ❌");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter skill name..."
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded w-full placeholder-gray-400"
      />
      <button onClick={handleAdd} className="px-4 bg-purple-500 text-white rounded">
        Add Skill
      </button>
    </div>
  );
}

export default SkillForm;