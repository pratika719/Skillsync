import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkill } from "../../store/skillslice";
import toast from "react-hot-toast";

function SkillForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.error("Skill name cannot be empty ❌");
      return;
    }
    try {
      await dispatch(
        addSkill({
          title,
          status: "not_started",
          userId: user?.id,
        })
      ).unwrap();
      toast.success("Skill added ✅");
      setTitle("");
    } catch (err) {
      toast.error("Failed to add skill ❌");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter skill name..."
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleAdd}
        className="px-4 bg-purple-500 text-white rounded"
      >
        Add Skill
      </button>
    </div>
  );
}

export default SkillForm;