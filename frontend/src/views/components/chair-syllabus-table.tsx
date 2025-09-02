import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Syllabus {
  syll_id: number;
  course_title: string;
  course_code: string;
  bg_school_year: string;
  course_semester: string;
  chair_submitted_at: string;
  dean_approved_at: string;
  version: number;
  status: string;
}

interface Props {
  syllabi: Syllabus[];
  departments: string[]; // department_code array
}

const SylList: React.FC<Props> = ({ syllabi, departments }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    course_year_level: "",
    course_semester: "",
    bg_school_year: "",
    department_code: "",
    status: "",
  });

  const applyFilters = () => {
    console.log("Apply filters:", { search, ...filters });
    // later replace with API call
  };

  const statusStyles: Record<string, string> = {
    Draft: "bg-gray-300 text-gray-600 border-gray-400",
    "Pending Chair Review": "bg-amber-100 text-amber-700 border-amber-300",
    "Returned by Chair": "bg-rose-200 text-rose-600 border-rose-400",
    "Requires Revision (Chair)": "bg-red-200 text-red-600 border-red-400",
    "Revised for Chair": "bg-blue-100 text-blue-600 border-blue-300",
    "Approved by Chair": "bg-green-200 text-green-700 border-green-400",
    "Returned by Dean": "bg-rose-300 text-rose-800 border-rose-400",
    "Requires Revision (Dean)": "bg-pink-200 text-pink-600 border-pink-400",
    "Revised for Dean": "bg-blue-200 text-blue-700 border-blue-400",
    "Approved by Dean": "bg-emerald-200 text-emerald-700 border-emerald-400",
  };

  return (
    <div className="flex min-h-screen">
   
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
       
    
        {/* Page Content */}
        <div className="p-6 text-left">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Search input */}
            <div className="relative w-[12%]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                className="border focus:outline-none focus:border-blue border-black w-full rounded p-1 pr-10"
                placeholder="Search..."
              />
              <button
                type="button"
                onClick={applyFilters}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                <svg
                  width="24px"
                  height="24px"
                  className="rounded-lg p-[2px]"
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

            {/* Year level */}
            <select
              value={filters.course_year_level}
              onChange={(e) =>
                setFilters({ ...filters, course_year_level: e.target.value })
              }
              className="border cursor-pointer focus:outline-none focus:border-blue rounded p-1 w-[14%]"
            >
              <option value="">Year level (All)</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="5th Year">5th Year</option>
            </select>

            {/* Semester */}
            <select
              value={filters.course_semester}
              onChange={(e) =>
                setFilters({ ...filters, course_semester: e.target.value })
              }
              className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[14%]"
            >
              <option value="">Semester(All)</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="Mid Year">Mid Year</option>
            </select>

            {/* School Year */}
            <select
              value={filters.bg_school_year}
              onChange={(e) =>
                setFilters({ ...filters, bg_school_year: e.target.value })
              }
              className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[15%]"
            >
              <option value="">School Year(All)</option>
              <option value="2019-2020">2019-2020</option>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2023-2024">2023-2024</option>
            </select>

            {/* Department */}
            <select
              value={filters.department_code}
              onChange={(e) =>
                setFilters({ ...filters, department_code: e.target.value })
              }
              className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[16%]"
            >
              <option value="">Departments(All)</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[9%]"
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved by Chair">Approved by Chair</option>
              <option value="Returned by Chair">Returned by Chair</option>
              <option value="Approved by Dean">Approved by Dean</option>
              <option value="Returned by Dean">Returned by Dean</option>
            </select>

            {/* Apply button */}
            <button
              onClick={applyFilters}
              className="bg-blue-500 hover:bg-blue focus:outline-none focus:border-blue cursor-pointer rounded text-white p-[4px] px-4"
            >
              Apply Filters
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left text-gray-500 shadow-lg mb-8">
            <thead className="text-xs text-white uppercase bg-blue-500">
              <tr className="text-white text-sm pb-2">
                <th className="pl-2 rounded-tl-lg">Course Title</th>
                <th>Course Code</th>
                <th>School Year</th>
                <th>Semester</th>
                <th>Submitted At</th>
                <th>Approved At</th>
                <th>Version</th>
                <th>Status</th>
                <th className="px-6 py-3 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {syllabi.map((syllabus, idx) => (
                <tr
                  key={syllabus.syll_id}
                  className={`${
                    idx % 2 === 0 ? "bg-[#e9edf7]" : "bg-white"
                  } hover:bg-gray4`}
                >
                  <td className="font-semibold pl-2">{syllabus.course_title}</td>
                  <td>{syllabus.course_code}</td>
                  <td>{syllabus.bg_school_year}</td>
                  <td>{syllabus.course_semester}</td>
                  <td>{syllabus.chair_submitted_at}</td>
                  <td>{syllabus.dean_approved_at}</td>
                  <td>Version {syllabus.version}</td>
                  <td>
                    <div
                      className={`w-full text-center px-1 py-1 border-2 rounded-lg ${
                        statusStyles[syllabus.status] ||
                        "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {syllabus.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex">
                    <div className="p-4">
                      <button
                          onClick={() => navigate(`/chairperson/syllabus/${syllabus.syll_id}`)}
                          className="hover:text-yellow hover:underline"
                          >
                          View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination placeholder */}
        </div>
      </div>
    </div>
  );
};

export default SylList;