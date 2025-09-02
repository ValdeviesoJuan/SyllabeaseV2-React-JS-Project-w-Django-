import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";
import BLHeader from "../layouts/bl_header";
import BLSidebar from "../layouts/bl_sidebar";

interface Memo {
  id: number;
  title: string;
  description: string;
  date: string;
  color: "green" | "yellow" | "red" | "gray";
  from: string;
  file_name: string[];
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const MemoPage: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([
    {
      id: 1,
      title: "Meeting Memo",
      description: "Reminder: faculty meeting on Friday.",
      date: "2025-08-30",
      color: "yellow",
      from: "admin@ustp.edu.ph",
      file_name: ["agenda.pdf"],
    },
    {
      id: 2,
      title: "System Update",
      description: "New grading system rollout next week.",
      date: "2025-09-05",
      color: "red",
      from: "it@ustp.edu.ph",
      file_name: ["manual.docx", "guide.pdf"],
    },
  ]);

  const [users] = useState<User[]>([
    { id: 1, firstname: "John", lastname: "Doe", email: "jdoe@ustp.edu.ph" },
    { id: 2, firstname: "Jane", lastname: "Smith", email: "jsmith@ustp.edu.ph" },
  ]);

  const [view, setView] = useState<"table" | "tiles">("table");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMemo, setEditMemo] = useState<Memo | null>(null);
  const [readMemos, setReadMemos] = useState<number[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("readDeanMemos") || "[]");
    setReadMemos(stored);
  }, []);

  const markAsRead = (id: number) => {
    if (!readMemos.includes(id)) {
      const updated = [...readMemos, id];
      setReadMemos(updated);
      localStorage.setItem("readDeanMemos", JSON.stringify(updated));
    }
  };

  const borderColor = (color: string) => {
    switch (color) {
      case "green":
        return "#22c55e";
      case "yellow":
        return "#facc15";
      case "red":
        return "#ef4444";
      default:
        return "#d1d5db";
    }
  };

  const filteredMemos = memos.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
          {/* Sidebar and Header */}
          <BLSidebar />
          <BLHeader />
          
    
          {/* Main content area */}
          <div
            className="flex-1 p-4 mt-14 ml-[288px]"
            style={{
                backgroundImage: 'url(/assets/Wave.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover', 
                backgroundColor: '#EEEEEE',
                minHeight: '100vh',
            }}
            >


          <div className="max-w shadow rounded-lg bg-white p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Memorandum
              </h1>
            </div>

            {/* Search & Controls */}
            <div className="mb-4 flex justify-between items-center">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search.."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <Icon
                  icon="mdi:magnify"
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setView("table")}
                  className={`p-2 rounded-xl transition ${
                    view === "table" ? "bg-[#c3dff3]" : "bg-[#d7ecf9]"
                  }`}
                  title="Table View"
                >
                  <Icon icon="mdi:table" width={22} height={22} />
                </button>
                <button
                  onClick={() => setView("tiles")}
                  className={`p-2 rounded-xl transition ${
                    view === "tiles" ? "bg-[#c3dff3]" : "bg-[#d7ecf9]"
                  }`}
                  title="Tile View"
                >
                  <Icon icon="mdi:view-grid" width={22} height={22} />
                </button>

                
              </div>
            </div>

            {/* Table View */}
            {view === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-[#007BFF] text-white text-sm">
                      <th className="px-2 py-2 w-[15%] rounded-l-lg">Title</th>
                      <th className="px-2 py-2 w-[55%]">Description</th>
                      <th className="px-2 py-2 w-[15%]">Date</th>
                      <th className="px-2 py-2 w-[10%] rounded-r-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    {filteredMemos.length > 0 ? (
                      filteredMemos.map((memo) => (
                        <tr key={memo.id}>
                          <td colSpan={4} className="p-0">
                            <div
                              onClick={() => markAsRead(memo.id)}
                              className="grid grid-cols-4 items-center rounded shadow-sm cursor-pointer px-2 py-2"
                              style={{
                                border: `2px solid ${borderColor(memo.color)}`,
                                backgroundColor: readMemos.includes(memo.id)
                                  ? "#ffffff"
                                  : "#e5e7eb",
                              }}
                            >
                              <div className="truncate font-medium pr-2">
                                {memo.title}
                              </div>
                              <div className="truncate px-2">
                                {memo.description}
                              </div>
                              <div className="text-sm text-gray-600 pr-2">
                                {new Date(memo.date).toLocaleDateString()}
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditMemo(memo);
                                    setShowEditModal(true);
                                  }}
                                  className="border-2 border-green-600 rounded-full px-3 py-2"
                                >
                                  <Icon
                                    icon="mdi:pencil"
                                    width={18}
                                    height={18}
                                    style={{ color: "#28a745" }}
                                  />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMemos((prev) =>
                                      prev.filter((m) => m.id !== memo.id)
                                    );
                                  }}
                                  className="border-2 border-red-600 rounded-full px-3 py-2"
                                >
                                  <Icon
                                    icon="mdi:trash-can"
                                    width={18}
                                    height={18}
                                    style={{ color: "#dc3545" }}
                                  />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-6 text-gray-500"
                        >
                          No memos available at the moment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tile View */}
            {view === "tiles" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMemos.length > 0 ? (
                  filteredMemos.map((memo) => (
                    <div
                      key={memo.id}
                      className="p-4 rounded-lg shadow cursor-pointer transition"
                      style={{
                        border: `2px solid ${borderColor(memo.color)}`,
                        backgroundColor: readMemos.includes(memo.id)
                          ? "#ffffff"
                          : "#e5e7eb",
                      }}
                      onClick={() => markAsRead(memo.id)}
                    >
                      <h2 className="text-lg font-semibold mb-2 truncate">
                        {memo.title}
                      </h2>
                      <p className="text-gray-600 mb-2 line-clamp-3">
                        {memo.description}
                      </p>
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(memo.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-gray-500 col-span-full">
                    No memos available at the moment.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default MemoPage;