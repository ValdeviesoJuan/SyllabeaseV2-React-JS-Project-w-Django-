import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Pagination } from "flowbite-react";

// Mock data types
interface Course {
  course_code: string;
  course_title: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface BGroup {
  bg_id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: string;
}

interface LeaderMemberMap {
  [bg_id: number]: User[];
}

// Mock data
const courses: Course[] = [
  { course_code: "CS101", course_title: "Intro to CS" },
  { course_code: "MATH201", course_title: "Calculus II" },
];

const users: User[] = [
  { id: 1, firstname: "Alice", lastname: "Smith" },
  { id: 2, firstname: "Bob", lastname: "Johnson" },
];

const bgroups: BGroup[] = [
  {
    bg_id: 1,
    course_code: "CS101",
    course_title: "Intro to CS",
    bg_school_year: "2024-2025",
    course_semester: "1st Semester",
  },
  {
    bg_id: 2,
    course_code: "MATH201",
    course_title: "Calculus II",
    bg_school_year: "2024-2025",
    course_semester: "2nd Semester",
  },
];

const bleaders: LeaderMemberMap = {
  1: [users[0]],
  2: [users[1]],
};

const bmembers: LeaderMemberMap = {
  1: [users[1]],
  2: [users[0]],
};

const schoolYears = [
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
  "2027-2028",
  "2028-2029",
  "2029-2030",
];

const semesters = ["1st Semester", "2nd Semester", "Mid Year"];

const ChairBTeams: React.FC = () => {
  // Filter state
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course_code: "",
    bg_school_year: "",
    course_semester: "",
    leader_user_id: "",
    member_user_id: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredBGroups = bgroups.filter((bgroup) => {
    const matchesSearch =
      search === "" ||
      bgroup.course_code.toLowerCase().includes(search.toLowerCase()) ||
      bgroup.course_title.toLowerCase().includes(search.toLowerCase());

    const matchesCourse =
      filters.course_code === "" || bgroup.course_code === filters.course_code;

    const matchesYear =
      filters.bg_school_year === "" ||
      bgroup.bg_school_year === filters.bg_school_year;

    const matchesSemester =
      filters.course_semester === "" ||
      bgroup.course_semester === filters.course_semester;

    const matchesLeader =
      filters.leader_user_id === "" ||
      (bleaders[bgroup.bg_id] &&
        bleaders[bgroup.bg_id].some(
          (leader) => leader.id.toString() === filters.leader_user_id
        ));

    const matchesMember =
      filters.member_user_id === "" ||
      (bmembers[bgroup.bg_id] &&
        bmembers[bgroup.bg_id].some(
          (member) => member.id.toString() === filters.member_user_id
        ));

    return (
      matchesSearch &&
      matchesCourse &&
      matchesYear &&
      matchesSemester &&
      matchesLeader &&
      matchesMember
    );
  });

  // Pagination logic
  const paginatedBGroups = filteredBGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <form
        className="flex flex-wrap items-center gap-3 mb-4"
        onSubmit={handleApplyFilters}
      >
        <div className="relative w-[18%]">
          <input
            type="text"
            className="border focus:outline-none focus:border-blue border-black w-full rounded p-1 pr-10"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApplyFilters();
            }}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-2"
            tabIndex={-1}
            onClick={() => handleApplyFilters()}
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
        <select
          name="course_code"
          className="border cursor-pointer focus:outline-none focus:border-blue rounded p-1 w-[16%]"
          value={filters.course_code}
          onChange={handleFilterChange}
        >
          <option value="">Course Code (All)</option>
          {courses.map((course) => (
            <option key={course.course_code} value={course.course_code}>
              {course.course_code}-{course.course_title}
            </option>
          ))}
        </select>
        <select
          name="bg_school_year"
          className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[9%]"
          value={filters.bg_school_year}
          onChange={handleFilterChange}
        >
          <option value="">SY (All)</option>
          {schoolYears.map((sy) => (
            <option key={sy} value={sy}>
              {sy}
            </option>
          ))}
        </select>
        <select
          name="course_semester"
          className="border focus:outline-none focus:border-blue cursor-pointer rounded p-1 w-[14%]"
          value={filters.course_semester}
          onChange={handleFilterChange}
        >
          <option value="">Semester(All)</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
        <select
          name="leader_user_id"
          className="border cursor-pointer focus:outline-none focus:border-blue rounded p-1 w-[11%]"
          value={filters.leader_user_id}
          onChange={handleFilterChange}
        >
          <option value="">Leader(All)</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.lastname}, {user.firstname}
            </option>
          ))}
        </select>
        <select
          name="member_user_id"
          className="border cursor-pointer focus:outline-none focus:border-blue rounded p-1 w-[13%]"
          value={filters.member_user_id}
          onChange={handleFilterChange}
        >
          <option value="">Member(All)</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.lastname}, {user.firstname}
            </option>
          ))}
        </select>
        <Button
          color="blue"
          className="bg-blue5 hover:bg-blue focus:outline-none focus:border-blue cursor-pointer rounded text-white p-[4px] px-4"
          type="submit"
        >
          Apply Filters
        </Button>
      </form>
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-white uppercase bg-blue-600">
          <tr>
            <th className="rounded-tl-lg px-6 py-3">Course Code</th>
            <th className="px-6 py-3">Course Title</th>
            <th className="px-6 py-3">School Year</th>
            <th className="px-6 py-3">Semester</th>
            <th className="px-6 py-3">Leader/s</th>
            <th className="px-6 py-3">Member/s</th>
            <th className="rounded-tr-lg px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBGroups.map((bgroup, idx) => (
            <tr
              key={bgroup.bg_id}
              className={
                idx % 2 === 0
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }
            >
              <td className="px-6 py-4 font-medium">{bgroup.course_code}</td>
              <td className="px-6 py-4">{bgroup.course_title}</td>
              <td className="px-6 py-4">{bgroup.bg_school_year}</td>
              <td className="px-6 py-4">{bgroup.course_semester}</td>
              <td className="px-6 py-4">
                {(bleaders[bgroup.bg_id] || []).map((leader) => (
                  <p key={leader.id}>
                    {leader.lastname}, {leader.firstname}
                  </p>
                ))}
              </td>
              <td className="px-6 py-4">
                {(bmembers[bgroup.bg_id] || []).map((member) => (
                  <p key={member.id}>
                    {member.lastname}, {member.firstname}
                  </p>
                ))}
              </td>
              <td className="px-6 py-4 flex">
                <Button
                  color="success"
                  size="xs"
                  className="mx-1"
                  onClick={() => alert(`Edit BTeam ${bgroup.bg_id}`)}
                >
                  Edit
                </Button>
                <Button
                  color="failure"
                  size="xs"
                  className="mx-1"
                  onClick={() => alert(`Delete BTeam ${bgroup.bg_id}`)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBGroups.length / itemsPerPage)}
          onPageChange={handlePageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default ChairBTeams;