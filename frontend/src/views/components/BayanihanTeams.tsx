// components/BayanihanTeams.tsx
import React, { useState, useMemo } from "react";
import {
  Pagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
  Select,
  TextInput,
} from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";

// -----------------------------
// Types
// -----------------------------
type User = { id: number; firstname: string; lastname: string };
type Course = { course_code: string; course_title: string };
type BayanihanGroup = {
  bg_id: number;
  course_code: string;
  course_title: string;
  bg_school_year: string;
  course_semester: "1st Semester" | "2nd Semester" | "Mid Year";
};
type Filters = {
  search: string;
  course_code: string;
  bg_school_year: string;
  course_semester: string;
  leader_user_id: string;
  member_user_id: string;
};

// -----------------------------
// Mock Data
// -----------------------------
const USERS: User[] = [
  { id: 1, firstname: "Alex", lastname: "Santos" },
  { id: 2, firstname: "Bea", lastname: "Reyes" },
  { id: 3, firstname: "Carl", lastname: "Lopez" },
  { id: 4, firstname: "Dina", lastname: "Garcia" },
  { id: 5, firstname: "Evan", lastname: "Cruz" },
  { id: 6, firstname: "Faith", lastname: "Lim" },
  { id: 7, firstname: "Gio", lastname: "Aquino" },
];

const COURSES: Course[] = [
  { course_code: "CS101", course_title: "Intro to Computer Science" },
  { course_code: "IT202", course_title: "Web Development" },
  { course_code: "SE303", course_title: "Software Engineering" },
  { course_code: "DS404", course_title: "Data Science" },
  { course_code: "AI505", course_title: "Artificial Intelligence" },
];

const SY_OPTIONS = ["2023-2024", "2024-2025", "2025-2026", "2026-2027", "2027-2028"];

const SEM_OPTIONS: BayanihanGroup["course_semester"][] = [
  "1st Semester",
  "2nd Semester",
  "Mid Year",
];

const BGROUPS: BayanihanGroup[] = [
  {
    bg_id: 1001,
    course_code: "CS101",
    course_title: "Intro to Computer Science",
    bg_school_year: "2024-2025",
    course_semester: "1st Semester",
  },
  {
    bg_id: 1002,
    course_code: "IT202",
    course_title: "Web Development",
    bg_school_year: "2024-2025",
    course_semester: "2nd Semester",
  },
  {
    bg_id: 1003,
    course_code: "SE303",
    course_title: "Software Engineering",
    bg_school_year: "2025-2026",
    course_semester: "1st Semester",
  },
];

const BLEADERS: Record<number, User[]> = {
  1001: [USERS[0], USERS[2]],
  1002: [USERS[1]],
  1003: [USERS[3]],
};

const BMEMBERS: Record<number, User[]> = {
  1001: [USERS[4], USERS[5]],
  1002: [USERS[6]],
  1003: [USERS[0], USERS[1]],
};

// ✅ Cast as a proper icon component for Flowbite TextInput
const SearchIcon = HiOutlineSearch as unknown as React.FC<
  React.ComponentProps<"svg">
>;
// -----------------------------
// Component
// -----------------------------
const BayanihanTeams: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    course_code: "",
    bg_school_year: "",
    course_semester: "",
    leader_user_id: "",
    member_user_id: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Filtering logic
  const filteredData = useMemo(() => {
    return BGROUPS.filter((bg) => {
      const searchMatch =
        filters.search === "" ||
        bg.course_code.toLowerCase().includes(filters.search.toLowerCase()) ||
        bg.course_title.toLowerCase().includes(filters.search.toLowerCase());

      const courseMatch =
        filters.course_code === "" || bg.course_code === filters.course_code;

      const syMatch =
        filters.bg_school_year === "" || bg.bg_school_year === filters.bg_school_year;

      const semMatch =
        filters.course_semester === "" || bg.course_semester === filters.course_semester;

      const leaderMatch =
        filters.leader_user_id === "" ||
        (BLEADERS[bg.bg_id] || []).some((u) => String(u.id) === filters.leader_user_id);

      const memberMatch =
        filters.member_user_id === "" ||
        (BMEMBERS[bg.bg_id] || []).some((u) => String(u.id) === filters.member_user_id);

      return searchMatch && courseMatch && syMatch && semMatch && leaderMatch && memberMatch;
    });
  }, [filters]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, currentPage]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* ✅ Search bar aligned right */}
      <div className="flex justify-end mb-4">
        <TextInput
            icon={SearchIcon}
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && setCurrentPage(1)}
            className="w-64"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-6 min-w-0">
        <div className="">
            <Select
            className=""
            value={filters.course_code}
            onChange={(e) => setFilters({ ...filters, course_code: e.target.value })}
            >
            <option value="">All Courses</option>
            {COURSES.map((c) => (
                <option key={c.course_code} value={c.course_code}>
                {c.course_code} - {c.course_title}
                </option>
            ))}
            </Select>
        </div>

        <div className="">
            <Select
            className=""
            value={filters.bg_school_year}
            onChange={(e) => setFilters({ ...filters, bg_school_year: e.target.value })}
            >
            <option value="">All School Years</option>
            {SY_OPTIONS.map((sy) => (
                <option key={sy} value={sy}>
                {sy}
                </option>
            ))}
            </Select>
        </div>

        <div className="">
            <Select
            className=""
            value={filters.course_semester}
            onChange={(e) => setFilters({ ...filters, course_semester: e.target.value })}
            >
            <option value="">All Semesters</option>
            {SEM_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>
                {sem}
                </option>
            ))}
            </Select>
        </div>

        <div className="">
            <Select
            className=""
            value={filters.leader_user_id}
            onChange={(e) => setFilters({ ...filters, leader_user_id: e.target.value })}
            >
            <option value="">All Leaders</option>
            {USERS.map((u) => (
                <option key={u.id} value={u.id}>
                {u.firstname} {u.lastname}
                </option>
            ))}
            </Select>
        </div>

        <div className="">
            <Select
            className=""
            value={filters.member_user_id}
            onChange={(e) => setFilters({ ...filters, member_user_id: e.target.value })}
            >
            <option value="">All Members</option>
            {USERS.map((u) => (
                <option key={u.id} value={u.id}>
                {u.firstname} {u.lastname}
                </option>
            ))}
            </Select>
        </div>
    </div>

      {/* Table */}
      <Table striped>
        <TableHead>
          <TableHeadCell>Course Code</TableHeadCell>
          <TableHeadCell>Course Title</TableHeadCell>
          <TableHeadCell>School Year</TableHeadCell>
          <TableHeadCell>Semester</TableHeadCell>
          <TableHeadCell>Leaders</TableHeadCell>
          <TableHeadCell>Members</TableHeadCell>
        </TableHead>

        <TableBody>
          {paginated.map((bg) => (
            <TableRow key={bg.bg_id}>
              <TableCell>{bg.course_code}</TableCell>
              <TableCell>{bg.course_title}</TableCell>
              <TableCell>{bg.bg_school_year}</TableCell>
              <TableCell>{bg.course_semester}</TableCell>
              <TableCell>
                {(BLEADERS[bg.bg_id] || [])
                  .map((u) => `${u.firstname} ${u.lastname}`)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {(BMEMBERS[bg.bg_id] || [])
                  .map((u) => `${u.firstname} ${u.lastname}`)
                  .join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / perPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BayanihanTeams;
