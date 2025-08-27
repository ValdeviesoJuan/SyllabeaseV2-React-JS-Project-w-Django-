// src/views/bayanihan_leader/BLMemoPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import BLHeader from "../layouts/bl_header";
import BLSidebar from "../layouts/bl_sidebar";
import { Button, Badge } from "flowbite-react";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";

type MemoItem = {
  id: number | string;
  title: string;
  description: string;
  date: string; // ISO or readable
  color?: "green" | "yellow" | "red" | string;
  file_name?: string | string[]; // filenames or JSON string
  url?: string; // where to navigate when clicking (placeholder)
};

const MOCK_MEMOS: MemoItem[] = [
  {
    id: 1,
    title: "Memo: Schedule Change",
    description:
      "There will be a change in the class schedule for CS101 starting next week.",
    date: "2025-08-20",
    color: "green",
    file_name: ["schedule.pdf", "notes.docx"],
    url: "/memos/1",
  },
  {
    id: 2,
    title: "Memo: New Template",
    description:
      "Please use the updated syllabus template found attached. Make sure to update your outcomes.",
    date: "2025-07-05",
    color: "yellow",
    file_name: "template.docx",
    url: "/memos/2",
  },
  {
    id: 3,
    title: "Memo: System Downtime",
    description:
      "The system will undergo maintenance this weekend. Expect intermittent outages.",
    date: "2025-06-12",
    color: "red",
    file_name: ["maintenance.pdf"],
    url: "/memos/3",
  },
];

function extToIcon(ext: string) {
  const e = ext.toLowerCase();
  if (["pdf"].includes(e)) return { label: "PDF", color: "text-red-600" };
  if (["doc", "docx"].includes(e)) return { label: "DOC", color: "text-blue-600" };
  if (["xls", "xlsx"].includes(e)) return { label: "XLS", color: "text-green-600" };
  if (["jpg", "jpeg", "png"].includes(e)) return { label: "IMG", color: "text-amber-600" };
  return { label: "FILE", color: "text-sky-600" };
}

export default function BLMemoPage() {
  const [view, setView] = useState<"table" | "tiles">("table");
  const [search, setSearch] = useState("");
  const [memos] = useState<MemoItem[]>(MOCK_MEMOS);
  const [readSet, setReadSet] = useState<Set<string>>(new Set());

  // load read memos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("leaderReadMemos");
    if (stored) {
      try {
        const arr = JSON.parse(stored) as string[];
        setReadSet(new Set(arr));
      } catch {
        setReadSet(new Set());
      }
    }
  }, []);

  // persist readSet when changes
  useEffect(() => {
    localStorage.setItem("leaderReadMemos", JSON.stringify(Array.from(readSet)));
  }, [readSet]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return memos;
    return memos.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [memos, search]);

  function markAsRead(id: string | number) {
    setReadSet((prev) => {
      const next = new Set(prev);
      next.add(String(id));
      return next;
    });
  }

  function handleRowClick(url?: string, id?: string | number) {
    if (id !== undefined) markAsRead(id);
    // placeholder navigation: if you later wire to react-router, replace
    if (url) window.location.href = url;
  }

  // helper for border colors
  function borderHex(c?: string) {
    switch (c) {
      case "green":
        return "#22c55e";
      case "yellow":
        return "#facc15";
      case "red":
        return "#ef4444";
      default:
        return "#d1d5db";
    }
  }

  return (
    <div className="relative min-h-screen bg-[#EEEEEE]">
      {/* Wave background (expects public/assets/Wave.png) */}
      <div
        className="fixed inset-0 -z-10 min-h-screen bg-no-repeat bg-top bg-contain"
        style={{ backgroundImage: "url('/assets/Wave.png')" }}
      />

      {/* Header & Sidebar */}
      <BLSidebar />
      <BLHeader />

      {/* Page content wrapper - leave space for header & sidebar */}
      <main className="pl-[288px] pt-[72px] p-6">
        <div className="mt-0 p-4 shadow bg-white border-dashed rounded-lg">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Memorandum Issued by the Dean</h1>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Search..."
                />
                <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              {/* View toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView("table")}
                  className={`p-2 rounded-xl transition ${
                    view === "table" ? "bg-[#d7ecf9]" : "bg-white hover:bg-[#f2f8ff]"
                  }`}
                  title="Table View"
                >
                  <FiList className="w-5 h-5 text-black" />
                </button>

                <button
                  type="button"
                  onClick={() => setView("tiles")}
                  className={`p-2 rounded-xl transition ${
                    view === "tiles" ? "bg-[#d7ecf9]" : "bg-white hover:bg-[#f2f8ff]"
                  }`}
                  title="Tile View"
                >
                  <FiGrid className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Table View */}
          {view === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-sm">
                    <th className="px-2 py-2 w-[15%] rounded-l-lg text-left">Title</th>
                    <th className="px-2 py-2 w-[60%] text-left">Description</th>
                    <th className="px-2 py-2 w-[10%] rounded-r-lg text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-gray-500">
                        No memos available at the moment.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((memo) => {
                      const isRead = readSet.has(String(memo.id));
                      return (
                        <tr key={memo.id}>
                          <td colSpan={3} className="p-0">
                            <div
                              onClick={() => handleRowClick(memo.url, memo.id)}
                              className="leader-memo-row grid grid-cols-3 items-center rounded shadow-sm cursor-pointer px-2 py-2 transition"
                              data-memo-id={memo.id}
                              style={{
                                border: `2px solid ${borderHex(memo.color)}`,
                                backgroundColor: isRead ? "#ffffff" : "#e5e7eb",
                              }}
                            >
                              <div className="truncate pr-2 font-medium">{memo.title}</div>
                              <div className="truncate px-2">{memo.description}</div>
                              <div className="text-sm text-gray-600 pr-2">
                                {new Date(memo.date).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "long",
                                  day: "2-digit",
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tile View */}
          {view === "tiles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.length === 0 ? (
                <p className="text-center py-6 text-gray-500 col-span-full">No memos available at the moment.</p>
              ) : (
                filtered.map((memo) => {
                  const files =
                    typeof memo.file_name === "string"
                      ? (() => {
                          try {
                            const parsed = JSON.parse(memo.file_name);
                            return Array.isArray(parsed) ? parsed : [memo.file_name];
                          } catch {
                            return [memo.file_name];
                          }
                        })()
                      : Array.isArray(memo.file_name)
                      ? memo.file_name
                      : [];

                  const isRead = readSet.has(String(memo.id));

                  return (
                    <div
                      key={memo.id}
                      onClick={() => handleRowClick(memo.url, memo.id)}
                      className="leader-tile-memo p-4 border rounded-lg shadow cursor-pointer transition relative group overflow-hidden"
                      data-memo-id={memo.id}
                      style={{
                        border: `2px solid ${borderHex(memo.color)}`,
                        backgroundColor: isRead ? "#ffffff" : "#e5e7eb",
                      }}
                    >
                      <h2 className="text-lg font-semibold mb-2 text-gray-800">{memo.title}</h2>

                      <p className="text-gray-600 mb-2">{memo.description}</p>

                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(memo.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}
                      </div>

                      <div className="flex flex-wrap gap-2 z-10 relative">
                        {files.map((file, i) => {
                          const ext = String(file).split(".").pop() || "";
                          const icon = extToIcon(ext);
                          return (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                // placeholder download / open
                                // Replace with real download link or react-router navigation later
                                alert(`Download ${file} (placeholder)`);
                              }}
                              className="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-md bg-[#E8F1FF] hover:shadow-lg transition stop-row-click"
                              style={{ borderColor: "#B3D4FC" }}
                              title={`Download ${file}`}
                            >
                              <span className={`${icon.color} font-semibold text-xs`}>{icon.label}</span>
                              <span className="text-sm font-medium text-[#1E3A8A] truncate max-w-[120px]">
                                {String(file).length > 20 ? String(file).slice(0, 17) + "..." : file}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
