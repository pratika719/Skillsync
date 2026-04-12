import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import toast from "react-hot-toast";


function TaskForm() {
  const [text, setText] = useState("");
  const [skillId, setSkillId] = useState("");
  const { createTask, skills } = useTasks();
  

  const handleAdd = async () => {
    if (!text.trim()) { toast.error("Task cannot be empty ❌"); return; }
    try {
      await createTask(text, skillId || null);
      toast.success("Task added ✅");
      setText("");
      setSkillId("");
    } catch {
      toast.error("Failed to add task ❌");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
        className="border p-2 rounded w-full"
      />
      <select
        value={skillId}
        onChange={(e) => setSkillId(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">No skill</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>{skill.title}</option>
        ))}
      </select>
      <button onClick={handleAdd} className="px-4 bg-green-500 text-white rounded">
        Add
      </button>
    </div>
  );
}

export default TaskForm;