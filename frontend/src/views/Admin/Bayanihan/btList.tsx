import React, { useState } from "react";
import { Button } from "flowbite-react";

// Mock types
interface Leader {
  id: number;
  firstname: string;
  lastname: string;
}
interface Member {
  id: number;
  firstname: string;
  lastname: string;
}
interface BGroup {
  id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: string;
  leaders: Leader[];
  members: Member[];
}

const BayanihanTeamList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course_code: "",
    department_id: "",
    bg_school_year: "",
    course_semester: "",
  });

  // Mock Data (replace with Django API later)
  const [bgroups] = useState<BGroup[]>([
    {
      id: 1,
      course_code: "CS101",
      course_title: "Intro to CS",
      bg_school_year: "2023-2024",
      course_semester: "1st Semester",
      leaders: [{ id: 1, firstname: "Juan", lastname: "Dela Cruz" }],
      members: [
        { id: 2, firstname: "Maria", lastname: "Santos" },
        { id: 3, firstname: "Jose", lastname: "Reyes" },
      ],
    },
    {
      id: 2,
      course_code: "IT201",
      course_title: "Systems Analysis",
      bg_school_year: "2024-2025",
      course_semester: "2nd Semester",
      leaders: [{ id: 4, firstname: "Ana", lastname: "Lopez" }],
      members: [{ id: 5, firstname: "Mark", lastname: "Lim" }],
    },
  ]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    console.log("Filters applied:", { search, ...filters });
    // Filtering logic can be added here
  };

  return (
    <div className="flex justify-center relative">
    <div className="p-6 pb-10 shadow bg-white border-dashed rounded-lg absolute top-[50px]">
      {/* Header + Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-4xl text-[#201B50]">Bayanihan Teams</h1>

        <Button
          className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2 bg-blue-100 hover:bg-blue-200"
          onClick={() =>
            alert("Open Create Bayanihan Team form (placeholder)")
          }
        >
          {/* SVG icon */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="7" cy="10" r="3" />
            <circle cx="17" cy="10" r="3" />
            <circle cx="12" cy="16" r="3" />
            <path d="M2 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
            <path d="M12 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
          </svg>
          Create Bayanihan Team
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search Box */}
        <div className="relative w-[18%]">
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border focus:outline-none focus:border-blue-500 border-gray-400 w-full rounded p-1 pr-10"
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
          <button
            type="button"
            onClick={applyFilters}
            className="absolute inset-y-0 right-0 flex items-center px-2"
          >
            {/* Search Icon */}
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
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Example Select Filters */}
        <select
          name="course_code"
          value={filters.course_code}
          onChange={handleFilterChange}
          className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[16%]"
        >
          <option value="">Course Code (All)</option>
          <option value="CS101">CS101 - Intro to CS</option>
          <option value="IT201">IT201 - Systems Analysis</option>
        </select>

        <select
          name="department_id"
          value={filters.department_id}
          onChange={handleFilterChange}
          className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[16%]"
        >
          <option value="">Department (All)</option>
          <option value="1">CS - Computer Science</option>
          <option value="2">IT - Information Tech</option>
        </select>

        <select
          name="bg_school_year"
          value={filters.bg_school_year}
          onChange={handleFilterChange}
          className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[9%]"
        >
          <option value="">SY (All)</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>

        <select
          name="course_semester"
          value={filters.course_semester}
          onChange={handleFilterChange}
          className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[14%]"
        >
          <option value="">Semester (All)</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
          <option value="Mid Year">Mid Year</option>
        </select>

        <Button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white p-[4px] px-4"
        >
          Apply Filters
        </Button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead>
          <tr>
            <th className="bg-blue-600 rounded-tl-lg px-4 py-3 text-white">
              Course Title
            </th>
            <th className="bg-blue-600 px-4 py-3 text-white">School Year</th>
            <th className="bg-blue-600 px-4 py-3 text-white">Semester</th>
            <th className="bg-blue-600 px-4 py-3 text-white">Leader/s</th>
            <th className="bg-blue-600 px-4 py-3 text-white">Member/s</th>
            <th className="bg-blue-600 rounded-tr-lg px-4 py-3 text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bgroups.map((bgroup, i) => (
            <tr
              key={bgroup.id}
              className={`${
                i % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200`}
            >
              <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {bgroup.course_code} - {bgroup.course_title}
              </td>
              <td className="px-4 py-4">{bgroup.bg_school_year}</td>
              <td className="px-4 py-4">{bgroup.course_semester}</td>
              <td className="px-4 py-4">
                {bgroup.leaders.map((l) => (
                  <p key={l.id}>
                    {l.lastname}, {l.firstname}
                  </p>
                ))}
              </td>
              <td className="px-4 py-4">
                {bgroup.members.map((m) => (
                  <p key={m.id}>
                    {m.lastname}, {m.firstname}
                  </p>
                ))}
              </td>
              <td className="px-4 py-4 flex gap-2">
                <button className="text-green-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default function BGroupCreate() {
  return (
    <div className="min-h-screen w-full bg-[#EEEEEE]">
      <BayanihanTeamList />
    </div>
  );
}
