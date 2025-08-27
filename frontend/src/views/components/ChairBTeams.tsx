// frontend/src/views/components/ChairBTeams.tsx
import React, { FC } from "react";

/**
 * Placeholder react component that stands in for <livewire:chair-b-teams />
 * Replace contents with data fetching and table/rows from your API when backend exists.
 */
const ChairBTeams: FC = () => {
  // dummy data for layout
  const teams = [
    { id: 1, name: "Team A", members: 5, course: "CS101" },
    { id: 2, name: "Team B", members: 4, course: "ENG102" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Team Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Members</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{t.id}</td>
                <td className="py-3 px-4 font-medium text-[#201B50]">{t.name}</td>
                <td className="py-3 px-4">{t.course}</td>
                <td className="py-3 px-4">{t.members}</td>
                <td className="py-3 px-4">
                  <button className="px-3 py-1 rounded bg-[#d7ecf9] hover:bg-[#c3dff3] transition text-black font-semibold">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChairBTeams;
