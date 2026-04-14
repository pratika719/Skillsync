import React from 'react';
import SkillForm from "../features/skills/SkillForm";
import SkillList from "../features/skills/SkillList";


function Skills() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Skills</h1>
      <SkillForm />
      <SkillList />
    </div>
  );
}

export default Skills;