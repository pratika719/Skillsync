import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/taskslice";
import toast from "react-hot-toast";

function TaskForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAdd = () => {
    if (!text.trim()) {
      toast.error("Task cannot be empty ❌");
      return;
    }
    console.log("Adding task for user:", user); // Debugging log

    dispatch(
      addTask({
        title: text,
        completed: false,
        userId: user?.id, // ✅ FIXED: was user?.id
      })
    );

    toast.success("Task added ✅");
    setText("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleAdd}
        className="px-4 bg-green-500 text-white rounded"
      >
        Add
      </button>
    </div>
  );
}

export default TaskForm;