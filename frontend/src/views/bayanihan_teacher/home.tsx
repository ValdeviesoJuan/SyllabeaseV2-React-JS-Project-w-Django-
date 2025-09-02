// src/views/bayanihan_teacher/home.tsx
import React from "react";
import { BookOpen, FileText, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  // Example static syllabi data
  const syllabi = [
    {
      course_code: "BSIT-101",
      course_title: "Introduction to Computing",
      bg_school_year: "2024-2025",
      course_semester: "1st Semester",
      chair_submitted_at: "2024-08-01",
      dean_submitted_at: "2024-08-10",
      version: 1,
      status: "Approved by Dean",
    },
    {
      course_code: "BSIT-102",
      course_title: "Data Structures",
      bg_school_year: "2024-2025",
      course_semester: "2nd Semester",
      chair_submitted_at: "2024-08-05",
      dean_submitted_at: "",
      version: 1,
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 text-left">
      {/* Top Cards */}
      {/* Header Section - 3 Cards */}
        {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 - No of Syllabus */}
        <div className="flex items-center bg-white rounded-lg shadow-2xl hover:scale-105 transition ease-in-out">
          <div className="m-5 bg-blue-100 w-fit h-fit rounded-full">
            <div className="p-4">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2262c6"
                  d="M832 128H192a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64zm-64 640H256V256h512v512z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col mr-6 pt-5">
            <div className="text-3xl font-semibold text-blue-600">10</div>
            <div className="ml-0 text-blue-500">No of Syllabus</div>
            <div className="text-blue-600 justify-end flex mt-2 mb-1">
              <div className="w-fit bg-blue-100 rounded-full p-1">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M18 12L13 7M18 12L13 17"
                    stroke="#2262c6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Completed Syllabus */}
        <div className="flex items-center bg-white rounded-lg shadow-2xl hover:scale-105 transition ease-in-out">
          <div className="m-5 bg-green-100 w-fit h-fit rounded-full">
            <div className="p-4">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#31a858"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col mr-6 pt-5">
            <div className="text-3xl font-semibold text-green-600">7/10</div>
            <div className="ml-0 text-green-500">Completed Syllabus</div>
            <div className="text-green-600 justify-end flex mt-2 mb-1">
              <div className="w-fit bg-green-100 rounded-full p-1">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M18 12L13 7M18 12L13 17"
                    stroke="#31a858"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Pending Syllabus */}
        <div className="flex items-center bg-white rounded-lg shadow-2xl hover:scale-105 transition ease-in-out">
          <div className="m-5 bg-yellow-100 w-fit h-fit rounded-full">
            <div className="p-4">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col mr-6 pt-5">
            <div className="text-3xl font-semibold text-yellow-600">3</div>
            <div className="ml-0 text-yellow-500">Pending Syllabus</div>
            <div className="text-yellow-600 justify-end flex mt-2 mb-1">
              <div className="w-fit bg-yellow-100 rounded-full p-1">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M18 12L13 7M18 12L13 17"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4 pt-11">
        <div className="relative w-[18%]">
          <input
            type="text"
            className="border focus:outline-none focus:border-blue-500 border-black w-full rounded p-1 pr-10"
            placeholder="Search..."
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-2"
            tabIndex={-1}
          >
            🔍
          </button>
        </div>

        <select className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[16%]">
          <option value="">Year level (All)</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
          <option>5th Year</option>
        </select>

        <select className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[16%]">
          <option value="">Semester (All)</option>
          <option>1st Semester</option>
          <option>2nd Semester</option>
          <option>Mid Year</option>
        </select>

        <select className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[18%]">
          <option value="">School Year (All)</option>
          <option>2023-2024</option>
          <option>2024-2025</option>
          <option>2025-2026</option>
        </select>

        <select className="border cursor-pointer focus:outline-none focus:border-blue-500 rounded p-1 w-[15%]">
          <option value="">Status (All)</option>
          <option>Pending</option>
          <option>Approved by Chair</option>
          <option>Returned by Chair</option>
          <option>Approved by Dean</option>
          <option>Returned by Dean</option>
        </select>

        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1">
          Apply Filters
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead>
          <tr className="text-xs text-white uppercase bg-blue-500">
            <th className="px-6 py-3 rounded-tl">Course Code</th>
            <th className="px-6 py-3">Course Title</th>
            <th className="px-6 py-3">School Year</th>
            <th className="px-6 py-3">Semester</th>
            <th className="px-6 py-3">Date Submitted At</th>
            <th className="px-6 py-3">Date Approved At</th>
            <th className="px-6 py-3">Version</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 rounded-tr">Action</th>
          </tr>
        </thead>
        <tbody>
          {syllabi.map((s, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-100"
              } border hover:bg-gray-200`}
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {s.course_code}
              </td>
              <td className="px-6 py-4">{s.course_title}</td>
              <td className="px-6 py-4">{s.bg_school_year}</td>
              <td className="px-6 py-4">{s.course_semester}</td>
              <td className="px-6 py-4">{s.chair_submitted_at}</td>
              <td className="px-6 py-4">{s.dean_submitted_at || "—"}</td>
              <td className="px-6 py-4">Version {s.version}</td>
              <td className="px-6 py-4">
                <div className="w-full text-center px-2 py-1 border-2 rounded-lg bg-green-100 text-green-700 border-green-300">
                  {s.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-500 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
