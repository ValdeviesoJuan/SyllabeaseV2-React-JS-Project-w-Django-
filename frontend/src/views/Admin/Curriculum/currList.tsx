import React, { useState } from "react";
import { Button } from "flowbite-react";

interface Curriculum {
  id: number;
  curr_code: string;
  effectivity: string;
  department_code: string;
}

const CurriculaList: React.FC = () => {
  // Dummy data for now (replace with API later)
  const [curricula, setCurricula] = useState<Curriculum[]>([
    { id: 1, curr_code: "BSCS2023", effectivity: "2023", department_code: "CS" },
    { id: 2, curr_code: "BSIT2022", effectivity: "2022", department_code: "IT" },
  ]);

  const handleEdit = (id: number) => {
    console.log("Edit curriculum:", id);
    // later: navigate(`/admin/curricula/edit/${id}`)
  };

  const handleDelete = (id: number) => {
    setCurricula(curricula.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <div className="p-4 shadow-lg bg-white rounded-lg mt-16 mx-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl text-black font-semibold">Curricula</h2>
          <Button
            className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2"
            style={{ background: "#d7ecf9" }}
            onMouseOver={(e) => ((e.target as HTMLButtonElement).style.background = "#c3dff3")}
            onMouseOut={(e) => ((e.target as HTMLButtonElement).style.background = "#d7ecf9")}
            onClick={() => console.log("Navigate to Create New Curriculum")}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8v8M8 12h8"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
            </svg>
            Create New Curriculum
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <table className="w-full text-sm text-left text-black">
            <thead>
              <tr>
                <th className="bg-blue-400 rounded-tl-lg px-6 py-3 text-white">Code</th>
                <th className="bg-blue-400 px-6 py-3 text-white">Effectivity</th>
                <th className="bg-blue-400 px-6 py-3 text-white">Department</th>
                <th className="bg-blue-400 px-6 py-3"></th>
                <th className="bg-blue-400 px-6 py-3 rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {curricula.map((curriculum) => (
                <tr key={curriculum.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 font-bold">{curriculum.curr_code}</td>
                  <td className="px-6 py-4">{curriculum.effectivity}</td>
                  <td className="px-6 py-4 font-bold">{curriculum.department_code}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(curriculum.id)}
                      className="text-green-600 font-medium hover:scale-105 transition"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(curriculum.id)}
                      className="text-red-600 font-medium hover:scale-105 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination placeholder */}
          <div className="mt-4 flex justify-center">
            <span className="text-gray-600 text-sm">Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculaList;
