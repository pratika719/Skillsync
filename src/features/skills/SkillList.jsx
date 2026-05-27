import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SkillCard from "./SkillCard";
import { useDebounce } from "@/hooks/useDebounce";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { useSkillQuery } from "./useSkillQuery";
//debouncing for skillnsearch to reduce api calls
//usemeo for storring filter results filter runs again if change in skilllist etc
function SkillList() {
  const { skills, isLoading } = useSkillQuery();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() =>
    skills
      .filter((s) => s.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter((s) => statusFilter === "all" ? true : s.status === statusFilter),
    [skills, debouncedSearch, statusFilter]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} variant="skill" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded w-full placeholder-gray-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {(search || statusFilter !== "all") && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); }}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 whitespace-nowrap"
          >
            Clear ✕
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400">
        Showing {filtered.length} of {skills.length} skills
      </p>

      {}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No skills match your filters.</p>
      ) : (
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

export default SkillList;