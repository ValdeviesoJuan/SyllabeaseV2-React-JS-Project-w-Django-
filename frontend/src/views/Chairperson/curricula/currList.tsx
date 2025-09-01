// frontend/src/views/Chairperson/Curricula/CurriculaPage.tsx
import React, { useState } from "react";
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";
import Modal from "../../components/Modal";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

/**
 * CurriculaPage
 *
 * - This is a client-side React + TypeScript rewrite of the Blade view you supplied.
 * - Uses mock data (no backend) and local handlers for Edit/Delete.
 * - Tailwind classes kept similar to your original styling.
 */

type Curriculum = {
  curr_id: number;
  curr_code: string;
  effectivity: string;
  department_code: string;
};

const MOCK_CURRICULA: Curriculum[] = [
  { curr_id: 1, curr_code: "BSCS-2018", effectivity: "2018-2023", department_code: "CS" },
  { curr_id: 2, curr_code: "BSIT-2020", effectivity: "2020-2025", department_code: "IT" },
  { curr_id: 3, curr_code: "BSIS-2019", effectivity: "2019-2024", department_code: "IS" },
  // add more if you want to test pagination
];

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Notification {
  id: string;
  data: {
    for: string;
    course_code: string;
    bg_school_year: string;
    message: string;
    action_url: string;
  };
  created_at: Date;
}

const mockUser: User = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    data: {
      for: "CS",
      course_code: "CS101",
      bg_school_year: "2024-2025",
      message: "New syllabus submitted for review",
      action_url: "/syllabus/1",
    },
    created_at: new Date("2024-01-15T10:30:00"),
  },
];

const CurriculaPage: React.FC = () => {
  const [user] = useState<User>(mockUser);
    const [notifications] = useState<Notification[]>(mockNotifications);
    const [missingSignature] = useState(true);
  const [activeRoute, setActiveRoute] = useState<string>("curricula");
  const navigate = useNavigate();
  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  // Data / pagination state
  const [curricula, setCurricula] = useState<Curriculum[]>(MOCK_CURRICULA);
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Modal for creating new curriculum (client-side mock)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCurr, setNewCurr] = useState({
    curr_code: "",
    effectivity: "",
    department_code: "",
  });

  const totalPages = Math.max(1, Math.ceil(curricula.length / perPage));
  const displayed = curricula.slice((page - 1) * perPage, page * perPage);

  const openCreate = () => setShowCreateModal(true);
  const closeCreate = () => {
    setShowCreateModal(false);
    setNewCurr({ curr_code: "", effectivity: "", department_code: "" });
  };

  const handleCreateSave = () => {
    // client-side mock create
    const nxtId = curricula.length ? Math.max(...curricula.map((c) => c.curr_id)) + 1 : 1;
    setCurricula([
      ...curricula,
      { curr_id: nxtId, curr_code: newCurr.curr_code || `CURR-${nxtId}`, effectivity: newCurr.effectivity || "", department_code: newCurr.department_code || "" },
    ]);
    closeCreate();
  };

  const handleEdit = (id: number) => {
    navigate(`/chairperson/curricula/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    // confirm + client-side delete stub
    if (!window.confirm("Delete this curriculum? (client-side only)")) return;
    setCurricula(curricula.filter((c) => c.curr_id !== id));
  };

  return (
   <div className="min-h-screen bg-[#EEEEEE] relative">
    {/* Sidebar */}
    <ChairSidebar activeRoute={activeRoute} handleRouteChange={(r) => setActiveRoute(r)} />

    {/* Navigation bar */}
    <ChairpersonNav
      user={user}
      notifications={notifications}
      activeRoute={activeRoute}
      handleRouteChange={handleRouteChange}
      handleLogout={handleLogout}
    />

    {/* Main content positioned by X/Y coordinates */}
    <div
      className="absolute"
      style={{
        top: "80px", // distance from top (nav bar height)
        left: "280px", // distance from left (sidebar width)
        right: "20px", // optional right padding
      }}
    >
      <style>{`
          body {
            background-image: url('/assets/Wave.png');
            background-repeat: no-repeat;
            background-position: top;
            background-attachment: fixed;
            background-size: cover;
            background-color: transparent;
          }
        `}</style>
      <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-[#201B50]" style={{ fontSize: "2rem" }}>
              Curricula
            </h1>
          <button
            onClick={() => openCreate()}
            className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-[#d7ecf9] hover:bg-[#c3dff3]"
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
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead>
              <tr>
                <th className="bg-blue-600 text-white rounded-tl-lg px-6 py-3">Curr Code</th>
                <th className="bg-blue-600 text-white px-6 py-3">Effectivity</th>
                <th className="bg-blue-600 text-white px-6 py-3">Department</th>
                <th className="bg-blue-600 text-white rounded-tr-lg px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length ? (
                displayed.map((curr, idx) => (
                  <tr
                    key={curr.curr_id}
                    className={`${idx % 2 === 0 ? "bg-[#e9edf7]" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{curr.curr_code}</td>
                    <td className="px-6 py-4">{curr.effectivity}</td>
                    <td className="px-6 py-4">{curr.department_code}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        onClick={() => handleEdit(curr.curr_id)}
                        className="text-green-600 font-semibold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(curr.curr_id)}
                        className="text-red-600 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No curricula found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page <= 1}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Create Modal */}
<Modal
  show={showCreateModal}
  title="Create New Curriculum"
  onClose={closeCreate}
  onSubmit={handleCreateSave}
>
  {/* ✅ Wrapper div for styling */}
  <div className="w-[600px] bg-white text-black rounded-lg p-4">
    <div className="grid grid-cols-1 gap-3">
      <label className="text-sm font-medium">Curriculum Code</label>
      <input
        value={newCurr.curr_code}
        onChange={(e) =>
          setNewCurr((s) => ({ ...s, curr_code: e.target.value }))
        }
        className="border p-2 rounded w-full bg-white text-black"
        placeholder="e.g., BSCS-2018"
      />

      <label className="text-sm font-medium">Effectivity</label>
      <input
        value={newCurr.effectivity}
        onChange={(e) =>
          setNewCurr((s) => ({ ...s, effectivity: e.target.value }))
        }
        className="border p-2 rounded w-full bg-white text-black"
        placeholder="e.g., 2018-2023"
      />

      <label className="text-sm font-medium">Department Code</label>
      <input
        value={newCurr.department_code}
        onChange={(e) =>
          setNewCurr((s) => ({ ...s, department_code: e.target.value }))
        }
        className="border p-2 rounded w-full bg-white text-black"
        placeholder="e.g., CS"
      />
    </div>
  </div>
</Modal>

  </div>
  );
};

export default CurriculaPage;
