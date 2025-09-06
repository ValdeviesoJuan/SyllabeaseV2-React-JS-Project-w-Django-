import React, { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import type { FC, SVGProps } from "react"
import ChairSidebar from "../../layouts/chairSidebar";
import ChairpersonNav from "../../layouts/chairpersonNav";
import { useNavigate } from "react-router-dom";

// Mock type for memo
type Memo = {
  id: number;
  title: string;
  description: string;
  date: string;
  color: "green" | "yellow" | "red" | string;
  file_name: string[] | string;
};

// Mock data (replace with backend API later)
const MOCK_MEMOS: Memo[] = [
  {
    id: 1,
    title: "Memo 1",
    description: "This is the description for Memo 1",
    date: "2025-08-27",
    color: "green",
    file_name: ["file1.pdf", "image1.png"],
  },
  {
    id: 2,
    title: "Memo 2",
    description: "Memo 2 has a longer description to test truncation...",
    date: "2025-08-25",
    color: "yellow",
    file_name: "document.docx",
  },
  {
    id: 3,
    title: "Memo 3",
    description: "Another memo description",
    date: "2025-08-20",
    color: "red",
    file_name: ["sheet.xlsx"],
  },
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

const ChairMemo: React.FC = () => {
  const [user] = useState<User>(mockUser);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [memos, setMemos] = useState<Memo[]>(MOCK_MEMOS);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "tiles">("table");
  const [readMemos, setReadMemos] = useState<string[]>([]);
  const [activeRoute, setActiveRoute] = useState("home");
  const navigate = useNavigate();

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  // Load read memos from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chairReadMemos") || "[]");
    setReadMemos(stored);
  }, []);

  // Update localStorage when readMemos changes
  useEffect(() => {
    localStorage.setItem("chairReadMemos", JSON.stringify(readMemos));
  }, [readMemos]);

  // Handle memo row/tile click
  const handleMemoClick = (id: number) => {
  if (!readMemos.includes(String(id))) {
    setReadMemos([...readMemos, String(id)]);
  }

  const selectedMemo = memos.find(m => String(m.id) === String(id)); // ✅ Ensure matching type
  if (selectedMemo) {
    navigate(`/chairperson/memo/${id}`, { state: selectedMemo }); // ✅ Pass full memo object
  }
};


  const filteredMemos = memos.filter(
    (memo) =>
      memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBorderColor = (color: string) => {
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

  // Use SVG icons instead of <iconify-icon>
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    switch (ext) {
      case "pdf":
        return {
          icon: (
            <svg width="20" height="20" fill="#DC2626" viewBox="0 0 24 24">
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8L16 4.586A2 2 0 0 0 14.828 4H6zm7 1.414L18.586 7H15a2 2 0 0 1-2-2V3.414zM8 13h8v2H8v-2zm0 4h5v2H8v-2z" />
            </svg>
          ),
          color: "#DC2626",
        };
      case "doc":
      case "docx":
        return {
          icon: (
            <svg width="20" height="20" fill="#1D4ED8" viewBox="0 0 24 24">
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8L16 4.586A2 2 0 0 0 14.828 4H6zm7 1.414L18.586 7H15a2 2 0 0 1-2-2V3.414zM8 13h8v2H8v-2zm0 4h5v2H8v-2z" />
            </svg>
          ),
          color: "#1D4ED8",
        };
      case "xls":
      case "xlsx":
        return {
          icon: (
            <svg width="20" height="20" fill="#15803D" viewBox="0 0 24 24">
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8L16 4.586A2 2 0 0 0 14.828 4H6zm7 1.414L18.586 7H15a2 2 0 0 1-2-2V3.414zM8 13h8v2H8v-2zm0 4h5v2H8v-2z" />
            </svg>
          ),
          color: "#15803D",
        };
      case "jpg":
      case "jpeg":
      case "png":
        return {
          icon: (
            <svg width="20" height="20" fill="#CA8A04" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          ),
          color: "#CA8A04",
        };
      default:
        return {
          icon: (
            <svg width="20" height="20" fill="#2563EB" viewBox="0 0 24 24">
              <rect width="20" height="20" rx="3" />
            </svg>
          ),
          color: "#2563EB",
        };
    }
  };

  return (
    <div className="min-h-screen bg-transparent"
    
      style={{
        backgroundImage: `url(/assets/Wave.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "transparent",
        minHeight: "100vh" // ensures it fills the screen
      }}
      >
      {/* Import Nav + Sidebar */}
      <ChairpersonNav
        user={user}
        notifications={notifications}
        activeRoute={activeRoute}
        handleRouteChange={handleRouteChange}
        handleLogout={handleLogout}
      />

      <ChairSidebar activeRoute={activeRoute} handleRouteChange={handleRouteChange} />

      <div className="relative w-full h-screen">
        <div className="absolute"
          style={{
            top: "80px",
            left: "280px",
            right: "20px",
            bottom: "20px",
          }}
        >     
          <h1 className="text-2xl font-semibold text-white mb-6">
            Memorandum Issued by the Dean
          </h1>

          {/* Search & view toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400">
                  {React.createElement(HiOutlineSearch as FC<SVGProps<SVGSVGElement>>, { className: "w-5 h-5" })}
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                color={view === "table" ? "blue" : "gray"}
                onClick={() => setView("table")}
                className="p-2 rounded-xl"
              >
                {/* Table icon */}
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </Button>
              <Button
                color={view === "tiles" ? "blue" : "gray"}
                onClick={() => setView("tiles")}
                className="p-2 rounded-xl"
              >
                {/* Grid icon */}
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Table View */}
          {view === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed" style={{ borderCollapse: "separate", borderSpacing: "0 16px" }}>
                <thead>
                  <tr className="bg-blue-600 text-white text-sm">
                    <th className="px-2 py-2 w-[20%] rounded-l-lg text-left">Title</th>
                    <th className="px-2 py-2 w-[60%] text-left">Description</th>
                    <th className="px-2 py-2 w-[20%] rounded-r-lg text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {filteredMemos.length ? (
                    filteredMemos.map((memo) => {
                      const border = getBorderColor(memo.color);
                      const isRead = readMemos.includes(String(memo.id));
                      return (
                        <tr
                          key={memo.id}
                          onClick={() => handleMemoClick(memo.id)}
                          className="cursor-pointer transition shadow-sm"
                          style={{
                            backgroundColor: isRead ? "#ffffff" : "#e5e7eb",
                          }}
                        >
                          {/* First cell (left side corners) */}
                          <td
                            className="px-2 py-2 font-medium truncate rounded-l-lg"
                            style={{
                              borderTop: `2px solid ${border}`,
                              borderBottom: `2px solid ${border}`,
                              borderLeft: `2px solid ${border}`,
                            }}
                          >
                            {memo.title}
                          </td>

                          {/* Middle cell (no left/right border, just top/bottom) */}
                          <td
                            className="px-2 py-2 truncate"
                            style={{
                              borderTop: `2px solid ${border}`,
                              borderBottom: `2px solid ${border}`,
                            }}
                          >
                            {memo.description.length > 80
                              ? memo.description.slice(0, 80) + "..."
                              : memo.description}
                          </td>

                          {/* Last cell (right side corners) */}
                          <td
                            className="px-2 py-2 text-gray-600 rounded-r-lg"
                            style={{
                              borderTop: `2px solid ${border}`,
                              borderBottom: `2px solid ${border}`,
                              borderRight: `2px solid ${border}`,
                            }}
                          >
                            {new Date(memo.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-gray-500">
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
            <div className="grid grid-cols-4 gap-4">
              {filteredMemos.length ? (
                filteredMemos.map((memo) => {
                  const border = getBorderColor(memo.color);
                  const isRead = readMemos.includes(String(memo.id));
                  const files = Array.isArray(memo.file_name)
                    ? memo.file_name
                    : [memo.file_name];
                  return (
                    <div
                      key={memo.id}
                      onClick={() => handleMemoClick(memo.id)}
                      className="chair-tile-memo p-4 border rounded-lg shadow cursor-pointer transition relative group overflow-hidden"
                      style={{
                        border: `2px solid ${border}`,
                        backgroundColor: isRead ? "#ffffff" : "#e5e7eb",
                      }}
                    >
                      <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        {memo.title}
                      </h2>
                      <p className="text-gray-600 mb-2">
                        {memo.description.length > 100
                          ? memo.description.slice(0, 100) + "..."
                          : memo.description}
                      </p>
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(memo.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </div>

                      {/* Files */}
                      <div className="flex flex-wrap gap-2 z-10 relative">
                        {files.map((file, i) => {
                          const { icon } = getFileIcon(file);
                          return (
                            <a
                              key={i}
                              href="#"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-md bg-[#E8F1FF] hover:shadow-lg transition"
                              style={{ borderColor: "#B3D4FC" }}
                              title={`Download ${file}`}
                            >
                              {icon}
                              <span className="text-sm font-medium text-[#1E3A8A] truncate max-w-[120px]">
                                {file.length > 20 ? file.slice(0, 20) + "..." : file}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
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

export default ChairMemo;