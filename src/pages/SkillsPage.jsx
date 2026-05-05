import React from 'react';
import SkillForm from "@/features/skills/SkillForm";
import SkillList from "@/features/skills/SkillList";
import Modal from '../components/shared/Modal';

function SkillsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Skills</h1>
      <SkillForm />
      <SkillList />

    </div>
  );
}

export default SkillsPage;
