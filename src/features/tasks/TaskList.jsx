import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/taskslice";
import TaskCard from "./TaskCard";

function TaskList() {
  const dispatch = useDispatch();
  const { items: tasks, loading } = useSelector((state) => state.tasks);
  const skills = useSelector((state) => state.skills.items);
  const user = useSelector((state) => state.auth.user);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");

  useEffect(() => {
    if (user) dispatch(fetchTasks(user.id));
  }, [user, dispatch]);

  const filtered = tasks
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "completed") return t.completed;
      if (statusFilter === "pending") return !t.completed;
    })
    .filter((t) => {
      if (skillFilter === "all") return true;
      if (skillFilter === "none") return !t.skillId;
      return t.skillId === skillFilter;
    });

  if (loading) return <p className="text-gray-500">Loading tasks...</p>;

  return (
    <div className="space-y-4">

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-2">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="border p-2 rounded w-full"
        />

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Skill filter */}
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Skills</option>
          <option value="none">No Skill</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.title}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {(search || statusFilter !== "all" || skillFilter !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setSkillFilter("all");
            }}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 whitespace-nowrap"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400">
        Showing {filtered.length} of {tasks.length} tasks
      </p>

      {/* Task list */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No tasks match your filters.</p>
      ) : (
        filtered.map((task) => <TaskCard key={task.id} task={task} />)
      )}

    </div>
  );
}

export default TaskList;