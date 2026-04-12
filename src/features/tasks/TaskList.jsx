import { useMemo, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskCard from "./TaskCard";
import { useDebounce } from "../../hooks/useDebounce";

function TaskList() {
  const { tasks, skills, loading } = useTasks();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");

  const filtered = useMemo(() =>
    tasks
      .filter((t) => t.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter((t) => {
        if (statusFilter === "all") return true;
        if (statusFilter === "completed") return t.completed;
        return !t.completed;
      })
      .filter((t) => {
        if (skillFilter === "all") return true;
        if (skillFilter === "none") return !t.skillId;
        return t.skillId === skillFilter;
      }),
    [tasks, debouncedSearch, statusFilter, skillFilter]
  );

  if (loading) return <p className="text-gray-500">Loading tasks...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="border p-2 rounded w-full"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Skills</option>
          <option value="none">No Skill</option>
          {skills.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
        {(search || statusFilter !== "all" || skillFilter !== "all") && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); setSkillFilter("all"); }}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 whitespace-nowrap"
          >
            Clear ✕
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400">Showing {filtered.length} of {tasks.length} tasks</p>
      {filtered.length === 0
        ? <p className="text-gray-400 text-sm">No tasks match your filters.</p>
        : filtered.map((task) => <TaskCard key={task.id} task={task} />)
      }
    </div>
  );
}

export default TaskList;