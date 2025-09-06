import React from "react";
import { Button } from "flowbite-react";
import ChairSidebarLayout from "../../layouts/chairSidebar";
import { useNavigate } from "react-router-dom";

// Mocked Bayanihan Teams data (replace with API when backend is ready)
const bayanihanTeams = [
  {
    id: 1,
    name: "Team Alpha",
    members: ["Juan Dela Cruz", "Maria Santos"],
    created_at: "2024-08-01",
  },
  {
    id: 2,
    name: "Team Beta",
    members: ["Pedro Reyes", "Ana Cruz"],
    created_at: "2024-08-10",
  },
  // Add more mock teams as needed
];

const BtList: React.FC = () => {
  const navigate = useNavigate(); // ✅ moved inside component

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.background = "#c3dff3";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.background = "#d7ecf9";
  };

  return (
      <div
        className="min-h-screen pt-14 bg-[#EEEEEE]"
        style={{
          backgroundImage: "url(/assets/Wave.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg mt-14 max-w-6xl mx-auto">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-4xl text-[#201B50]">Bayanihan Teams</h1>
              <form>
                <Button
                  type="button"
                  className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2"
                  style={{ background: "#d7ecf9" }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={() => navigate("/chairperson/bayanihan/create")}
                >
                  <svg className="w-5 h-5" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="7" cy="10" r="3" />
                    <circle cx="17" cy="10" r="3" />
                    <circle cx="12" cy="16" r="3" />
                    <path d="M2 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
                    <path d="M12 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
                  </svg>
                  Create Bayanihan Team
                </Button>
              </form>
            </div>

            {/* Bayanihan Teams Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-[#d7ecf9]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bayanihanTeams.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">{team.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.members.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{team.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button color="info" size="xs" onClick={() => alert("View Team (no backend yet)")}>
                            View
                          </Button>
                          <Button
                            color="warning"
                            size="xs"
                            onClick={() => navigate(`/chairperson/bayanihan/edit/${team.id}`)} // ✅ navigate with ID
                          >
                            Edit
                          </Button>
                          <Button color="failure" size="xs" onClick={() => alert("Delete Team (no backend yet)")}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bayanihanTeams.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">
                        No Bayanihan Teams found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BtList;
