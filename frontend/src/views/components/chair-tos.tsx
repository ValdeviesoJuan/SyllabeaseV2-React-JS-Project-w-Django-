// src/views/Chairperson/Syllabus/SyllList.tsx
import React, { FC, useMemo, useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

// Types
type Tos = {
  tos_id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: string;
  tos_term: string;
  chair_submitted_at?: string | null;
  chair_approved_at?: string | null;
  tos_version: number;
  tos_status: string;
};

const MOCK_TOSS: Tos[] = [
  {
    tos_id: 1,
    course_code: "CS101",
    course_title: "Introduction to Programming",
    bg_school_year: "2024-2025",
    course_semester: "1st Semester",
    tos_term: "Midterm",
    chair_submitted_at: "2025-08-28 10:32",
    chair_approved_at: null,
    tos_version: 1,
    tos_status: "Pending Review",
  },
  {
    tos_id: 2,
    course_code: "CS102",
    course_title: "Data Structures",
    bg_school_year: "2024-2025",
    course_semester: "1st Semester",
    tos_term: "Final",
    chair_submitted_at: "2025-07-15 09:12",
    chair_approved_at: "2025-07-20 11:20",
    tos_version: 2,
    tos_status: "Approved by Chair",
  },
  {
    tos_id: 3,
    course_code: "IT201",
    course_title: "Web Technologies",
    bg_school_year: "2023-2024",
    course_semester: "2nd Semester",
    tos_term: "Midterm",
    chair_submitted_at: "2024-11-01 14:00",
    chair_approved_at: null,
    tos_version: 1,
    tos_status: "Returned by Chair",
  },
];

const SyllList: FC = () => {
  // Filters state
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<{
    course_year_level: string;
    course_semester: string;
    bg_school_year: string;
    tos_status: string;
  }>({
    course_year_level: "",
    course_semester: "",
    bg_school_year: "",
    tos_status: "",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 10;
  const [toss] = useState<Tos[]>(MOCK_TOSS);
  const navigate = useNavigate();

  const applyFilters = () => {
    setCurrentPage(1);
    console.log("applyFilters:", { search, filters });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && applyFilters();

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = useMemo(() => {
    return toss.filter((t) => {
      const q = search.trim().toLowerCase();
      if (q && !`${t.course_code} - ${t.course_title}`.toLowerCase().includes(q)) return false;
      if (filters.course_semester && t.course_semester !== filters.course_semester) return false;
      if (filters.bg_school_year && t.bg_school_year !== filters.bg_school_year) return false;
      if (filters.tos_status && t.tos_status !== filters.tos_status) return false;
      return true;
    });
  }, [toss, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const statusStylesMap: Record<string, { bg: string; color: string; border: string }> = {
    Draft: { bg: "#D1D5DB", color: "#4B5563", border: "#9CA3AF" },
    "Pending Review": { bg: "#FEF3C7", color: "#D97706", border: "#FCD34D" },
    "Returned by Chair": { bg: "#FECACA", color: "#E11D48", border: "#F87171" },
    "Requires Revision": { bg: "#FEE2E2", color: "#EF4444", border: "#FCA5A5" },
    "Revisions Applied": { bg: "#DBEAFE", color: "#3B82F6", border: "#93C5FD" },
    "Approved by Chair": { bg: "#D1FAE5", color: "#059669", border: "#6EE7B7" },
  };

  return (
    <div className="absolute text-left" style={{
          top: "150px",   // Y-coordinate
          left: "280px",  // X-coordinate
          right: "20px",
        }}>
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="relative w-[18%]">
          <input
            type="text"
            className="border focus:outline-none focus:border-blue border-black w-full rounded p-1 pr-10"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-2"
            tabIndex={-1}
            onClick={applyFilters}
          >
            <svg
              width="24px"
              className="rounded-lg p-[2px]"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#2468d2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <select
          className="border cursor-pointer focus:outline-none focus:border-blue rounded p-1 w-[15%]"
          value={filters.course_year_level}
          onChange={(e) => handleFilterChange("course_year_level", e.target.value)}
        >
          <option value="">Year level (All)</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
          <option value="5th Year">5th Year</option>
        </select>

        <select
          className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[15%]"
          value={filters.course_semester}
          onChange={(e) => handleFilterChange("course_semester", e.target.value)}
        >
          <option value="">Semester (All)</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
          <option value="Mid Year">Mid Year</option>
        </select>

        <select
          className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[17%]"
          value={filters.bg_school_year}
          onChange={(e) => handleFilterChange("bg_school_year", e.target.value)}
        >
          <option value="">School Year (All)</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>

        <select
          className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[14%]"
          value={filters.tos_status}
          onChange={(e) => handleFilterChange("tos_status", e.target.value)}
        >
          <option value="">Status (All)</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Returned by Chair">Returned by Chair</option>
          <option value="Approved by Chair">Approved by Chair</option>
        </select>

        <button
          className="bg-blue5 hover:bg-blue focus:outline-none focus:border-blue cursor-pointer rounded text-black p-[4px] px-4"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>

      {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-white uppercase bg-blue-600">
            <tr>
            <th className="rounded-tl-lg px-6 py-3">Course</th>
            <th className="px-6 py-3">School Year</th>
            <th className="px-6 py-3">Semester</th>
            <th className="px-6 py-3">Term</th>
            <th className="px-6 py-3">Submitted At</th>
            <th className="px-6 py-3">Approved At</th>
            <th className="px-6 py-3">Version</th>
            <th className="px-6 py-3">Status</th>
            <th className="rounded-tr-lg px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {paginated.map((tos, index) => (
            <tr
                key={tos.tos_id}
                className="bg-white text-black hover:bg-gray-100 border-b"
            >
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                {tos.course_code + " - " + tos.course_title}
                </td>
                <td className="px-6 py-4">{tos.bg_school_year}</td>
                <td className="px-6 py-4">{tos.course_semester}</td>
                <td className="px-6 py-4">{tos.tos_term}</td>
                <td className="px-6 py-4">{tos.chair_submitted_at ?? ""}</td>
                <td className="px-6 py-4">{tos.chair_approved_at ?? ""}</td>
                <td className="px-6 py-4">Version {tos.tos_version}</td>
                <td className="px-6 py-4">
                <div
                    className="w-full text-center px-1 py-1 border-2 rounded-lg"
                    style={{
                    backgroundColor: statusStylesMap[tos.tos_status]?.bg || "#F3F4F6",
                    color: statusStylesMap[tos.tos_status]?.color || "#6B7280",
                    borderColor: statusStylesMap[tos.tos_status]?.border || "#D1D5DB",
                    }}
                >
                    {tos.tos_status}
                </div>
                </td>
                <td className="px-6 py-4">
                <button
                  className="hover:text-yellow-500 hover:underline cursor-pointer"
                  onClick={() => navigate(`/chairperson/tos/view/${tos.tos_id}`)}
                >
                  View
                </button>
                </td>
            </tr>
            ))}
            {paginated.length === 0 && (
            <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-black">
                No data available
                </td>
            </tr>
            )}
        </tbody>
        </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * perPage + 1} -{" "}
          {Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyllList;
