import { useEffect, useMemo, useState } from "react";
import SkillCard from "./SkillCard";
import { useDebounce } from "../../hooks/useDebounce";
import { useSkills } from "../../hooks/useSkills";
function SkillList() {
  const { skills, loading } = useSkills();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState("all");



  const filtered = useMemo(() => skills
    .filter((s) =>
      s.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((s) => {
      if (statusFilter === "all") return true;
      return s.status === statusFilter;
    }), [debouncedSearch, statusFilter, skills]);

  if (loading) return <p className="text-gray-500">Loading skills...</p>;

  return (
    <div className="space-y-4">

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-2">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="border p-2 rounded w-full"
        />

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Clear filters */}
        {(search || statusFilter !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 whitespace-nowrap"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400">
        Showing {filtered.length} of {skills.length} skills
      </p>

      {/* Skill list */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No skills match your filters.</p>
      ) : (
        filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))
      )}

    </div>
  );
}

export default SkillList;