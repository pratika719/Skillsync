import { useSelector } from "react-redux";
import { memo, useMemo } from "react";

const StatCard = memo(function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-1">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
});

function Dashboard() {
  const tasks = useSelector((state) => state.tasks.items);
  const skills = useSelector((state) => state.skills.items);
  const user = useSelector((state) => state.auth.user);

  // ── Task stats ──────────────────────────────────────────
  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const pendingTasks = useMemo(() => totalTasks - completedTasks, [totalTasks, completedTasks]);

  // ── Tasks per skill breakdown ────────────────────────────
  const skillBreakdown = useMemo(() => skills.map((skill) => {
    const skillTasks = tasks.filter((t) => t.skillId === skill.id);
    const completed = skillTasks.filter((t) => t.completed).length;
    return {
      ...skill,
      total: skillTasks.length,
      completed,
      pending: skillTasks.length - completed,
    };
  }), [skills, tasks]);

 
  const recentTasks = useMemo(() => [...tasks].slice(-5).reverse(), [tasks]);

  return (
    <div className="p-6 space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.email} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here's what's going on with your tasks and skills.
        </p>
      </div>

      {/* Task stat cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Tasks Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Tasks"
            value={totalTasks}
            sub="all tasks created"
          />
          <StatCard
            label="Completed"
            value={completedTasks}
            sub={`${totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0}% done`}
          />
          <StatCard
            label="Pending"
            value={pendingTasks}
            sub="still in progress"
          />
        </div>
      </div>

      {/* Tasks per skill breakdown */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Tasks per Skill
        </h2>
        {skillBreakdown.length === 0 ? (
          <p className="text-gray-400 text-sm">No skills added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillBreakdown.map((skill) => (
              <div
                key={skill.id}
                className="bg-white rounded-xl shadow p-5 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-700">{skill.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      skill.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : skill.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {skill.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>🗂 Total: {skill.total}</span>
                  <span>✅ Done: {skill.completed}</span>
                  <span>⏳ Pending: {skill.pending}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Recent Activity
        </h2>
        {recentTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks yet.</p>
        ) : (
          <div className="bg-white rounded-xl shadow divide-y">
            {recentTasks.map((task) => {
              const skill = skills.find((s) => s.id === task.skillId);
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span>{task.completed ? "✅" : "⬜"}</span>
                    <span className="text-sm text-gray-700">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {skill && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {skill.title}
                      </span>
                    )}
                    <span
                      className={`text-xs font-medium ${
                        task.completed ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;