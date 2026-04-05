import React from "react";
import { useParams } from "react-router-dom";

const Achievements = () => {
  const { clubName } = useParams();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900">{clubName.replace(/-/g, " ")} Achievements</h1>

      <ul className="mt-6 space-y-4 text-lg text-gray-700">
        <li>🏅 Won Best Tech Club Award - 2024</li>
        <li>📢 Hosted a successful TEDx Event</li>
        <li>🏆 Conducted 50+ Workshops on AI & ML</li>
      </ul>
    </div>
  );
};

export default Achievements;
